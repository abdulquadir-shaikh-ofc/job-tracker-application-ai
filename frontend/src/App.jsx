import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calendar, TrendingUp, Filter, Download, Upload, 
  Plus, X, Edit2, Trash2, Save, MapPin, DollarSign, User,
  Clock, CheckCircle, XCircle, AlertCircle, FileText, BarChart3, Settings as SettingsIcon
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AIJobFetcher from './AIJobFetcher';
import Settings from './Settings';

const STATUS_OPTIONS = [
  { value: 'wishlist', label: 'Wishlist', icon: '⭐', color: '#A78BFA' },
  { value: 'applied', label: 'Applied', icon: '📤', color: '#60A5FA' },
  { value: 'screening', label: 'Screening', icon: '📞', color: '#34D399' },
  { value: 'interview', label: 'Interview', icon: '💼', color: '#FBBF24' },
  { value: 'offer', label: 'Offer', icon: '🎉', color: '#F87171' },
  { value: 'rejected', label: 'Rejected', icon: '❌', color: '#9CA3AF' },
  { value: 'accepted', label: 'Accepted', icon: '✅', color: '#10B981' },
  { value: 'declined', label: 'Declined', icon: '🚫', color: '#6B7280' }
];

const COLORS = ['#A78BFA', '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#9CA3AF', '#10B981', '#6B7280'];

function App() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('kanban'); // kanban, list, analytics
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'wishlist',
    location: '',
    salary: '',
    appliedDate: '',
    deadline: '',
    contact: '',
    contactEmail: '',
    notes: '',
    link: ''
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setApplications(applications.map(app => 
        app.id === editingId ? { ...formData, id: editingId } : app
      ));
      setEditingId(null);
    } else {
      setApplications([...applications, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      company: '', role: '', status: 'wishlist', location: '', salary: '',
      appliedDate: '', deadline: '', contact: '', contactEmail: '', notes: '', link: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (app) => {
    setFormData(app);
    setEditingId(app.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const handleAddAIApplications = (newApps) => {
    setApplications([...applications, ...newApps]);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(applications, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setApplications(data);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Analytics calculations
  const statusCounts = STATUS_OPTIONS.map(status => ({
    name: status.label,
    value: applications.filter(app => app.status === status.value).length,
    color: status.color
  })).filter(item => item.value > 0);

  const timelineData = applications
    .filter(app => app.appliedDate)
    .reduce((acc, app) => {
      const month = app.appliedDate.substring(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

  const timelineChart = Object.entries(timelineData)
    .map(([month, count]) => ({ month, applications: count }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      fontFamily: '"Fira Code", monospace',
      color: '#F1F5F9'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #34D399',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(52, 211, 153, 0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Briefcase size={32} color="#34D399" />
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#34D399', textShadow: '0 0 20px rgba(52, 211, 153, 0.5)' }}>
              JOB TRACKER_
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setShowSettings(true)}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: '#60A5FA',
                border: '2px solid #60A5FA',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <SettingsIcon size={18} /> SETTINGS
            </button>
            {['kanban', 'list', 'analytics'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '0.5rem 1rem',
                  background: view === v ? '#34D399' : 'transparent',
                  color: view === v ? '#0F172A' : '#34D399',
                  border: '2px solid #34D399',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                  letterSpacing: '0.05em'
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* AI Job Fetcher */}
        <AIJobFetcher applications={applications} onAddApplications={handleAddAIApplications} />

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#34D399',
              color: '#0F172A',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              transition: 'all 0.2s',
              boxShadow: '0 4px 15px rgba(52, 211, 153, 0.3)'
            }}
          >
            <Plus size={20} /> NEW APPLICATION
          </button>

          <input
            type="text"
            placeholder="Search companies or roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid #475569',
              borderRadius: '4px',
              color: '#F1F5F9',
              fontFamily: 'inherit',
              flex: '1',
              minWidth: '200px',
              fontSize: '0.95rem'
            }}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid #475569',
              borderRadius: '4px',
              color: '#F1F5F9',
              fontFamily: 'inherit',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map(status => (
              <option key={status.value} value={status.value}>
                {status.icon} {status.label}
              </option>
            ))}
          </select>

          <button onClick={exportData} style={{
            padding: '0.75rem 1rem',
            background: 'transparent',
            border: '2px solid #60A5FA',
            borderRadius: '4px',
            color: '#60A5FA',
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem'
          }}>
            <Download size={18} /> EXPORT
          </button>

          <label style={{
            padding: '0.75rem 1rem',
            background: 'transparent',
            border: '2px solid #A78BFA',
            borderRadius: '4px',
            color: '#A78BFA',
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem'
          }}>
            <Upload size={18} /> IMPORT
            <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Views */}
        {view === 'analytics' && <AnalyticsView applications={applications} statusCounts={statusCounts} timelineChart={timelineChart} />}
        {view === 'kanban' && <KanbanView applications={filteredApps} onEdit={handleEdit} onDelete={handleDelete} />}
        {view === 'list' && <ListView applications={filteredApps} onEdit={handleEdit} onDelete={handleDelete} />}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '2px solid #34D399',
            boxShadow: '0 10px 40px rgba(52, 211, 153, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#34D399', fontSize: '1.5rem' }}>
                {editingId ? 'EDIT APPLICATION' : 'NEW APPLICATION'}
              </h2>
              <button onClick={resetForm} style={{
                background: 'none',
                border: 'none',
                color: '#F87171',
                cursor: 'pointer',
                padding: '0.5rem'
              }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <FormField label="Company *" icon={<Briefcase size={18} />}>
                  <input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    style={inputStyle}
                  />
                </FormField>

                <FormField label="Role *" icon={<FileText size={18} />}>
                  <input
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    style={inputStyle}
                  />
                </FormField>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField label="Status" icon={<TrendingUp size={18} />}>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      style={inputStyle}
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.icon} {status.label}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Location" icon={<MapPin size={18} />}>
                    <input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      style={inputStyle}
                    />
                  </FormField>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField label="Salary Range" icon={<DollarSign size={18} />}>
                    <input
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      placeholder="e.g., $80k-$120k"
                      style={inputStyle}
                    />
                  </FormField>

                  <FormField label="Applied Date" icon={<Calendar size={18} />}>
                    <input
                      type="date"
                      value={formData.appliedDate}
                      onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                      style={inputStyle}
                    />
                  </FormField>
                </div>

                <FormField label="Deadline" icon={<Clock size={18} />}>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    style={inputStyle}
                  />
                </FormField>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField label="Contact Name" icon={<User size={18} />}>
                    <input
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      style={inputStyle}
                    />
                  </FormField>

                  <FormField label="Contact Email" icon={<User size={18} />}>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      style={inputStyle}
                    />
                  </FormField>
                </div>

                <FormField label="Job Link" icon={<FileText size={18} />}>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://..."
                    style={inputStyle}
                  />
                </FormField>

                <FormField label="Notes">
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    style={{...inputStyle, resize: 'vertical'}}
                  />
                </FormField>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#34D399',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <Save size={18} /> {editingId ? 'UPDATE' : 'SAVE'}
                </button>
                <button type="button" onClick={resetForm} style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'transparent',
                  color: '#F87171',
                  border: '2px solid #F87171',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}

const FormField = ({ label, icon, children }) => (
  <div>
    <label style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      marginBottom: '0.5rem',
      color: '#94A3B8',
      fontSize: '0.85rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      {icon}
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '2px solid #475569',
  borderRadius: '4px',
  color: '#F1F5F9',
  fontFamily: 'inherit',
  fontSize: '0.95rem',
  boxSizing: 'border-box'
};

const KanbanView = ({ applications, onEdit, onDelete }) => {
  const columns = STATUS_OPTIONS.map(status => ({
    ...status,
    apps: applications.filter(app => app.status === status.value)
  }));

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    }}>
      {columns.map(column => (
        <div key={column.value} style={{
          background: 'rgba(30, 41, 59, 0.4)',
          borderRadius: '8px',
          padding: '1rem',
          border: `2px solid ${column.color}`,
          minHeight: '200px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: `2px solid ${column.color}`
          }}>
            <span style={{ fontSize: '1.5rem' }}>{column.icon}</span>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {column.label}
            </h3>
            <span style={{
              marginLeft: 'auto',
              background: column.color,
              color: '#0F172A',
              padding: '0.25rem 0.5rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {column.apps.length}
            </span>
          </div>

          {column.apps.map(app => (
            <ApplicationCard key={app.id} app={app} onEdit={onEdit} onDelete={onDelete} color={column.color} />
          ))}
        </div>
      ))}
    </div>
  );
};

const ListView = ({ applications, onEdit, onDelete }) => (
  <div style={{ marginTop: '1rem' }}>
    {applications.length === 0 ? (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
        <Briefcase size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
        <p style={{ fontSize: '1.25rem' }}>No applications found</p>
      </div>
    ) : (
      <div style={{ display: 'grid', gap: '1rem' }}>
        {applications.map(app => {
          const status = STATUS_OPTIONS.find(s => s.value === app.status);
          return (
            <div key={app.id} style={{
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '8px',
              padding: '1.5rem',
              border: `2px solid ${status.color}`,
              borderLeft: `6px solid ${status.color}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#34D399' }}>
                    {app.company}
                  </h3>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#94A3B8' }}>
                    {app.role}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {status.icon} {status.label}
                    </span>
                    {app.location && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={14} /> {app.location}
                      </span>
                    )}
                    {app.salary && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <DollarSign size={14} /> {app.salary}
                      </span>
                    )}
                    {app.appliedDate && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} /> Applied: {app.appliedDate}
                      </span>
                    )}
                  </div>
                  {app.notes && (
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#94A3B8', fontStyle: 'italic' }}>
                      {app.notes}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(app)}
                    style={{
                      padding: '0.5rem',
                      background: 'transparent',
                      border: '2px solid #60A5FA',
                      borderRadius: '4px',
                      color: '#60A5FA',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(app.id)}
                    style={{
                      padding: '0.5rem',
                      background: 'transparent',
                      border: '2px solid #F87171',
                      borderRadius: '4px',
                      color: '#F87171',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const ApplicationCard = ({ app, onEdit, onDelete, color }) => (
  <div style={{
    background: 'rgba(15, 23, 42, 0.8)',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '0.75rem',
    border: `1px solid ${color}`,
    transition: 'all 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#F1F5F9' }}>
        {app.company}
      </h4>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <button
          onClick={() => onEdit(app)}
          style={{
            padding: '0.25rem',
            background: 'none',
            border: 'none',
            color: '#60A5FA',
            cursor: 'pointer'
          }}
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDelete(app.id)}
          style={{
            padding: '0.25rem',
            background: 'none',
            border: 'none',
            color: '#F87171',
            cursor: 'pointer'
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
    <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#94A3B8' }}>
      {app.role}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: '#64748B' }}>
      {app.location && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={12} /> {app.location}
        </span>
      )}
      {app.appliedDate && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Calendar size={12} /> {app.appliedDate}
        </span>
      )}
      {app.deadline && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#FBBF24' }}>
          <Clock size={12} /> Due: {app.deadline}
        </span>
      )}
    </div>
  </div>
);

const AnalyticsView = ({ applications, statusCounts, timelineChart }) => {
  const totalApps = applications.length;
  const activeApps = applications.filter(app => 
    !['rejected', 'declined', 'accepted'].includes(app.status)
  ).length;
  const successRate = totalApps > 0 
    ? ((applications.filter(app => app.status === 'offer' || app.status === 'accepted').length / totalApps) * 100).toFixed(1)
    : 0;

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <StatCard 
          title="Total Applications" 
          value={totalApps}
          icon={<Briefcase size={24} />}
          color="#60A5FA"
        />
        <StatCard 
          title="Active" 
          value={activeApps}
          icon={<TrendingUp size={24} />}
          color="#34D399"
        />
        <StatCard 
          title="Success Rate" 
          value={`${successRate}%`}
          icon={<CheckCircle size={24} />}
          color="#FBBF24"
        />
      </div>

      {/* Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Status Distribution */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          borderRadius: '8px',
          padding: '1.5rem',
          border: '2px solid #475569'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#34D399', fontSize: '1.25rem' }}>
            STATUS DISTRIBUTION
          </h3>
          {statusCounts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusCounts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #475569' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: 'center', color: '#64748B' }}>No data yet</p>
          )}
        </div>

        {/* Application Timeline */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          borderRadius: '8px',
          padding: '1.5rem',
          border: '2px solid #475569'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#34D399', fontSize: '1.25rem' }}>
            APPLICATION TIMELINE
          </h3>
          {timelineChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #475569' }} />
                <Line type="monotone" dataKey="applications" stroke="#34D399" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: 'center', color: '#64748B' }}>No timeline data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div style={{
    background: 'rgba(30, 41, 59, 0.6)',
    borderRadius: '8px',
    padding: '1.5rem',
    border: `2px solid ${color}`,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }}>
    <div style={{ color }}>{icon}</div>
    <div>
      <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color }}>
        {value}
      </p>
    </div>
  </div>
);

export default App;
