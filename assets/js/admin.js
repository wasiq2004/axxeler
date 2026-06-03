document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data ---
    // In a real app, this would be fetched from Firebase or a Google Sheet via an API
    let leadsData = [
        { id: 1, name: "Alice Johnson", email: "alice@saascorp.com", phone: "+1 555-0101", source: "Website Audit Form", date: "2026-06-01", status: "New" },
        { id: 2, name: "Bob Smith", email: "bsmith@manufacturing.co", phone: "+1 555-0293", source: "Lead Magnet PDF", date: "2026-05-31", status: "Contacted" },
        { id: 3, name: "Priya Raj", email: "priya@chennaitech.in", phone: "+91 98765 43210", source: "Website Audit Form", date: "2026-05-30", status: "New" }
    ];

    let blogData = [
        { id: 1, title: "How to Automate Lead Generation with Zapier & Make in 2026", category: "Zapier, Lead Gen", author: "Barani Kumar", date: "2026-06-01", status: "Published" },
        { id: 2, title: "Scaling Your Business in Chennai: Why Local Companies are Turning to Workflow Automation", category: "Local Business, Growth", author: "Barani Kumar", date: "2026-06-02", status: "Published" },
        { id: 3, title: "What is the True ROI of Workflow Automation vs Hiring Virtual Assistants?", category: "ROI Analysis", author: "Barani Kumar", date: "2026-06-03", status: "Published" }
    ];

    // Read from localStorage if exists (for demo persistence)
    const localLeads = localStorage.getItem('axxeler_leads');
    if(localLeads) leadsData = JSON.parse(localLeads);
    
    const localBlogs = localStorage.getItem('axxeler_blogs');
    if(localBlogs) blogData = JSON.parse(localBlogs);

    // --- DOM Elements ---
    const navItems = document.querySelectorAll('.nav-item');
    const viewTitle = document.getElementById('viewTitle');
    const primaryActionBtn = document.getElementById('primaryActionBtn');
    const viewSections = document.querySelectorAll('.view-section');
    
    const leadsTableBody = document.getElementById('leadsTableBody');
    const blogTableBody = document.getElementById('blogTableBody');
    
    const backToBlogBtn = document.getElementById('backToBlogBtn');
    const savePostBtn = document.getElementById('savePostBtn');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const toast = document.getElementById('toast');

    // --- Render Tables ---
    function renderLeads() {
        leadsTableBody.innerHTML = '';
        leadsData.sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(lead => {
            const statusClass = lead.status === 'New' ? 'status-new' : 'status-contacted';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600;">${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone}</td>
                <td style="color: var(--text-muted);">${lead.source}</td>
                <td>${lead.date}</td>
                <td><span class="status-badge ${statusClass}">${lead.status}</span></td>
            `;
            leadsTableBody.appendChild(tr);
        });
    }

    function renderBlogs() {
        blogTableBody.innerHTML = '';
        blogData.forEach(post => {
            const statusClass = post.status === 'Published' ? 'status-published' : 'status-draft';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600;">${post.title}</td>
                <td>${post.category}</td>
                <td>${post.author}</td>
                <td>${post.date}</td>
                <td><span class="status-badge ${statusClass}">${post.status}</span></td>
                <td><button class="btn btn-outline btn-small">Edit</button></td>
            `;
            blogTableBody.appendChild(tr);
        });
    }

    // --- Navigation Logic ---
    function switchView(viewId) {
        // Update Sidebar
        navItems.forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
        if(activeNav) activeNav.classList.add('active');

        // Hide all views
        viewSections.forEach(section => section.classList.remove('active'));

        // Show target view
        if(viewId === 'leads') {
            document.getElementById('view-leads').classList.add('active');
            viewTitle.innerText = "Leads Management";
            primaryActionBtn.style.display = 'none';
            renderLeads();
        } else if (viewId === 'blog') {
            document.getElementById('view-blog').classList.add('active');
            viewTitle.innerText = "Blog CMS";
            primaryActionBtn.style.display = 'inline-flex';
            primaryActionBtn.innerText = "+ New Post";
            renderBlogs();
        } else if (viewId === 'editor') {
            document.getElementById('view-editor').classList.add('active');
            viewTitle.innerText = "Create New Post";
            primaryActionBtn.style.display = 'none';
        } else {
            // Settings or placeholder
            viewTitle.innerText = "Coming Soon";
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            if(view !== 'settings') {
                switchView(view);
            } else {
                showToast("Settings module requires backend integration.");
            }
        });
    });

    // --- Editor Logic ---
    primaryActionBtn.addEventListener('click', () => {
        // Clear form
        document.getElementById('postTitle').value = '';
        document.getElementById('postTags').value = '';
        document.getElementById('postContent').value = '';
        switchView('editor');
    });

    backToBlogBtn.addEventListener('click', () => {
        switchView('blog');
    });
    
    cancelPostBtn.addEventListener('click', () => {
        switchView('blog');
    });

    savePostBtn.addEventListener('click', () => {
        const title = document.getElementById('postTitle').value;
        const tags = document.getElementById('postTags').value;
        const author = document.getElementById('postAuthor').value;
        
        if(!title) {
            alert("Post title is required!");
            return;
        }

        const newPost = {
            id: Date.now(),
            title: title,
            category: tags || 'Uncategorized',
            author: author,
            date: new Date().toISOString().split('T')[0],
            status: 'Draft' // Defaults to draft in demo
        };

        blogData.unshift(newPost);
        localStorage.setItem('axxeler_blogs', JSON.stringify(blogData));
        
        showToast("Post saved to drafts successfully!");
        switchView('blog');
    });

    // --- Toast Notification ---
    function showToast(message) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Initialize
    renderLeads();
    renderBlogs();

});
