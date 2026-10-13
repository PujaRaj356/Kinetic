import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { useAuth } from '../core/context/AuthContext';
import { Product } from '../core/models/product.model';
import { Order, OrderStatus } from '../core/models/order.model';
import { getAllProducts, addProduct, updateProduct, deleteProduct, productList, PRODUCTS_KEY } from '../core/services/productService';
import { getOrders, updateOrderStatus } from '../core/services/orderService';
import { useToast } from '../core/context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin, loginAs, users, updateUserRole, deleteUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'products' | 'transactions' | 'users'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productSearch, setProductSearch] = useState('');

  // Add / Edit Product Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Audio',
    price: '',
    oldPrice: '',
    stock: '',
    image: '',
    accent: '#d7ff4f',
    featured: false,
    description: '',
    highlights: '',
  });

  const reloadData = () => {
    setProducts(getAllProducts());
    setOrders(getOrders());
  };

  useEffect(() => {
    reloadData();
  }, [currentUser]);

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace />;
  }


  // Calculate statistics safely
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o?.total) || 0), 0);
  const totalStock = products.reduce((sum, p) => sum + (Number(p?.stock) || 0), 0);
  const pendingOrders = orders.filter(o => (o?.status || 'Processing') === 'Processing').length;

  const filteredProducts = products.filter(p =>
    (p?.name || '').toLowerCase().includes(productSearch.toLowerCase()) ||
    (p?.category || '').toLowerCase().includes(productSearch.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Audio',
      price: '',
      oldPrice: '',
      stock: '10',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      accent: '#d7ff4f',
      featured: false,
      description: '',
      highlights: 'High-grade durability, 1-year guarantee, Modern aesthetic',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name || '',
      category: p.category || 'Audio',
      price: String(p.price || 0),
      oldPrice: p.oldPrice ? String(p.oldPrice) : '',
      stock: String(p.stock || 0),
      image: p.image || '',
      accent: p.accent || '#d7ff4f',
      featured: !!p.featured,
      description: p.description || '',
      highlights: (p.highlights || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      deleteProduct(id);
      setProducts(getAllProducts());
      showToast(`Removed "${name}" from store.`);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to the default 24 products?')) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productList));
      setProducts(getAllProducts());
      showToast('Catalog restored to default 24 products with multi-image galleries.');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Please provide product name and price.');
      return;
    }

    const priceNum = parseFloat(formData.price) || 0;
    const oldPriceNum = formData.oldPrice ? parseFloat(formData.oldPrice) : undefined;
    const stockNum = parseInt(formData.stock, 10) || 0;
    const highlightsArr = formData.highlights
      ? formData.highlights.split(',').map(h => h.trim()).filter(Boolean)
      : [];

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        oldPrice: oldPriceNum,
        stock: stockNum,
        image: formData.image.trim(),
        images: editingProduct.images || [formData.image.trim()],
        accent: formData.accent,
        featured: formData.featured,
        description: formData.description.trim(),
        highlights: highlightsArr.length > 0 ? highlightsArr : editingProduct.highlights,
      };
      updateProduct(updated);
      showToast(`Updated "${updated.name}"`);
    } else {
      addProduct({
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        oldPrice: oldPriceNum,
        stock: stockNum,
        image: formData.image.trim(),
        accent: formData.accent,
        featured: formData.featured,
        description: formData.description.trim(),
        highlights: highlightsArr,
        specs: {
          'Category': formData.category,
          'Condition': 'Brand New Factory Sealed',
          'Warranty': '1 Year'
        }
      });
      showToast(`Added new product "${formData.name}" to catalog!`);
    }

    setProducts(getAllProducts());
    setIsModalOpen(false);
  };

  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
    showToast(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <section className="admin-page">
      {/* Top Banner with Admin Status */}
      <div className="admin-header">
        <div className="admin-title-area">
          <div className="admin-badge">👑 STORE ADMINISTRATOR</div>
          <h1>Admin Control Center</h1>
          <p className="admin-subtitle">
            Welcome back, <b>{currentUser.name}</b>. Manage store catalog, monitor real customer transactions, and control roles.
          </p>
        </div>
        <div className="admin-quick-switches">
          <button className="view-store-pill" onClick={handleResetCatalog} title="Restore default products">
            🔄 Reset Catalog
          </button>
          <Link to="/products" className="view-store-pill">
            ↗ View Public Store
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="admin-stats-row">
        <div className="stat-card">
          <div className="stat-label">TOTAL REVENUE</div>
          <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="stat-sub">From {orders.length} transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">PRODUCTS IN CATALOG</div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-sub">{totalStock} total units in inventory</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CUSTOMER ORDERS</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-sub">{pendingOrders} awaiting fulfillment</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">REGISTERED USERS</div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-sub">{users.filter(u => u.role === 'client').length} active clients</div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="admin-tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 Product Catalog ({products.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          💳 Customer Transactions & Orders ({orders.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 User Accounts & Roles ({users.length})
        </button>
      </div>

      {/* Tab 1: Products Catalog */}
      {activeTab === 'products' && (
        <div className="tab-pane">
          <div className="tab-pane-toolbar">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search products by title or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <button className="admin-add-btn" onClick={openAddModal}>
              + Add New Product
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="product-table-cell">
                        <img src={p.image} alt={p.name} className="product-thumb" />
                        <div>
                          <b className="product-cell-name">{p.name}</b>
                          <span className="product-cell-id">ID: #{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{p.category}</span>
                    </td>
                    <td>
                      <div className="price-cell">
                        <b>₹{p.price.toLocaleString('en-IN')}</b>
                        {p.oldPrice && <del>₹{p.oldPrice.toLocaleString('en-IN')}</del>}
                      </div>
                    </td>
                    <td>
                      <span className={`stock-badge ${(p.stock || 0) < 10 ? 'low' : 'ok'}`}>
                        {p.stock ?? 0} in stock
                      </span>
                    </td>
                    <td>⭐ {p.rating} ({p.reviews?.length || 0})</td>
                    <td>{p.featured ? <span className="featured-tag">★ Yes</span> : '—'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-buttons-cell">
                        <button className="edit-btn" onClick={() => openEditModal(p)}>
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Customer Transactions & Orders */}
      {activeTab === 'transactions' && (
        <div className="tab-pane">
          <div className="tab-pane-info">
            <p>Every order completed by normal shoppers during checkout is automatically logged here in real time.</p>
          </div>

          <div className="admin-orders-list">
            {orders.length === 0 ? (
              <div className="empty-state">No transactions recorded yet.</div>
            ) : (
              orders.map((order) => {
                const orderStatus = order.status || 'Processing';
                const paymentMethod = (order.paymentMethod || 'card').toUpperCase();
                const createdAtDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Recent';

                return (
                  <div className="order-transaction-card" key={order.id}>
                    <div className="order-card-header">
                      <div>
                        <div className="order-id-badge">{order.id}</div>
                        <span className="order-time">{createdAtDate}</span>
                      </div>
                      <div className="order-header-right">
                        <span className="payment-method-badge">
                          Payment: {paymentMethod}
                        </span>
                        <div className="status-selector-wrap">
                          <label>Status:</label>
                          <select
                            value={orderStatus}
                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`status-select status-${orderStatus.toLowerCase()}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="order-card-body">
                      <div className="customer-info-col">
                        <h4>Customer Details</h4>
                        <p><b>Name:</b> {order.customerName || 'Shopper'}</p>
                        <p><b>Email:</b> {order.customerEmail || '—'}</p>
                        <p><b>Phone:</b> {order.customerPhone || '—'}</p>
                        <p><b>Address:</b> {order.shippingAddress}, {order.city} ({order.pincode})</p>
                      </div>

                      <div className="order-items-col">
                        <h4>Ordered Items ({order.items?.length || 0})</h4>
                        <div className="order-items-scroll">
                          {(order.items || []).map((item, idx) => {
                            const prod = item?.product;
                            const qty = item?.quantity || 1;
                            const prodPrice = prod?.price || 0;
                            const prodImg = prod?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
                            const prodName = prod?.name || 'Product Item';

                            return (
                              <div className="order-item-row" key={idx}>
                                <img src={prodImg} alt={prodName} />
                                <div className="item-row-info">
                                  <span>{prodName}</span>
                                  <small>Qty: {qty} × ₹{prodPrice.toLocaleString('en-IN')}</small>
                                </div>
                                <b>₹{(prodPrice * qty).toLocaleString('en-IN')}</b>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="order-total-col">
                        <h4>Financial Summary</h4>
                        <div className="fin-line">
                          <span>Subtotal:</span>
                          <span>₹{(order.subtotal || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="fin-line">
                          <span>Shipping:</span>
                          <span>{order.shipping ? `₹${order.shipping}` : 'FREE'}</span>
                        </div>
                        <div className="fin-total">
                          <span>Total Paid:</span>
                          <b>₹{(order.total || 0).toLocaleString('en-IN')}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Registered Users & Roles */}
      {activeTab === 'users' && (
        <div className="tab-pane">
          <div className="tab-pane-info">
            <p>Manage all registered accounts. You can upgrade any client to an Admin or downgrade them to a normal shopper.</p>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Change Role</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <b>{u.name}</b> {u.id === currentUser.id && <span className="you-badge">(You)</span>}
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role === 'admin' ? 'role-admin' : 'role-client'}`}>
                        {u.role === 'admin' ? '👑 Admin' : '🛍️ Client (Shopper)'}
                      </span>
                    </td>
                    <td>
                      <select
                        value={u.role}
                        onChange={(e) => {
                          updateUserRole(u.id, e.target.value as 'admin' | 'client');
                          showToast(`Updated role for ${u.name} to ${e.target.value}`);
                        }}
                        className="role-select"
                      >
                        <option value="client">Client (Shopper)</option>
                        <option value="admin">Store Admin</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {u.id !== currentUser.id ? (
                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (window.confirm(`Delete user account ${u.email}?`)) {
                              deleteUser(u.id);
                              showToast(`Deleted ${u.email}`);
                            }
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <span style={{ color: '#888', fontSize: '0.85rem' }}>Active Session</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product to Store'}</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-modal-form">
              <div className="two">
                <label>
                  Product Title
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Apex Noise Cancelling Earbuds"
                  />
                </label>
                <label>
                  Category
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Audio">Audio</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Bags">Bags</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Home">Home</option>
                    <option value="Tech">Tech</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Eyewear">Eyewear</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </label>
              </div>

              <div className="three">
                <label>
                  Selling Price (₹)
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 2999"
                  />
                </label>
                <label>
                  Original Price (₹)
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    placeholder="Optional, e.g. 3999"
                  />
                </label>
                <label>
                  Stock Inventory
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="e.g. 15"
                  />
                </label>
              </div>

              <label>
                Image URL (Unsplash or Direct Image Link)
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </label>

              {formData.image && (
                <div className="image-preview-box">
                  <img src={formData.image} alt="Preview" />
                  <span>Image Preview</span>
                </div>
              )}

              <label>
                Description
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of product features, build materials, etc."
                />
              </label>

              <label>
                Highlights (comma-separated)
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </label>

              <div className="form-toggle-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Feature on Homepage Curated Drop</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="ghost-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
