// Mock Database for ShareNet, leihs, and Shelf integrations.
// Persists state to localStorage.

const DEFAULT_USERS = [
  {
    _id: "user-1",
    fullName: "Anjali Bhavani",
    email: "anjali@campus.edu",
    college: "Main Campus (Engineering)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    trustScore: 98,
    ratings: 4.9,
    completedDeals: 24,
    role: "student"
  },
  {
    _id: "user-2",
    fullName: "Aditya Raj",
    email: "aditya@campus.edu",
    college: "Main Campus (Engineering)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
    trustScore: 95,
    ratings: 4.8,
    completedDeals: 18,
    role: "student"
  },
  {
    _id: "user-3",
    fullName: "Pranila Sharma",
    email: "pranila@campus.edu",
    college: "Main Campus (Engineering)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pranila",
    trustScore: 92,
    ratings: 4.6,
    completedDeals: 12,
    role: "student"
  },
  {
    _id: "user-admin",
    fullName: "Prof. Rajesh Kumar",
    email: "rajesh.admin@campus.edu",
    college: "Main Campus (Engineering)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    trustScore: 100,
    ratings: 5.0,
    completedDeals: 150,
    role: "admin"
  }
];

const DEFAULT_ITEMS = [
  {
    _id: "item-1",
    title: "Scientific Calculator Casio fx-991EX",
    description: "Perfect condition scientific calculator, essential for engineering and mathematics exams. Includes cover.",
    category: "Electronics",
    mode: "rent",
    price: 50,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
    owner: DEFAULT_USERS[1], // Aditya Raj
    availability: true,
    condition: "Excellent",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "item-2",
    title: "Engineering Physics Textbook - 10th Ed",
    description: "Standard reference book for first-year engineering physics. Highlights in some chapters but otherwise clean.",
    category: "Books",
    mode: "share",
    price: 0,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    owner: DEFAULT_USERS[2], // Pranila Sharma
    availability: true,
    condition: "Good",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "item-3",
    title: "Electric Kettle 1.5L",
    description: "Heats water in under 2 minutes. Great for hostel rooms. Auto-shutoff feature works perfectly.",
    category: "Appliances",
    mode: "rent",
    price: 30,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400",
    owner: DEFAULT_USERS[1],
    availability: true,
    condition: "Good",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// leihs Equipment Inventory (Lending workflow + Reservation + Return Tracking)
const DEFAULT_LENDING_ITEMS = [
  {
    _id: "lending-1",
    name: "Sony Alpha 7 IV DSLR Camera",
    description: "Professional full-frame mirrorless camera. Perfect for campus journalism, video shoots, and photography projects.",
    category: "Photography",
    serialNumber: "SN-DSLR-74291",
    status: "available", // available, reserved, borrowed
    location: "Main Library, Media Lab (Room 204)",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
    qrCode: "QR-LEIHS-DSLR01",
    kitId: "kit-photo-1" // associated with a kit
  },
  {
    _id: "lending-2",
    name: "Epson EH-TW7000 4K Projector",
    description: "High-brightness home cinema projector. Can be borrowed for student club events or presentations.",
    category: "AV Equipment",
    serialNumber: "SN-PROJ-88122",
    status: "reserved",
    location: "Mechanical Block A, Lab 102",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&q=80&w=400",
    qrCode: "QR-LEIHS-PROJ01",
    kitId: null
  },
  {
    _id: "lending-3",
    name: "Oculus Quest 2 VR Headset",
    description: "128GB Virtual Reality headset for research, development, and immersive learning simulations.",
    category: "Computing",
    serialNumber: "SN-VRH-09312",
    status: "borrowed",
    location: "Engineering C-Block, Innovation Hub",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=400",
    qrCode: "QR-LEIHS-VR01",
    kitId: "kit-vr-1"
  },
  {
    _id: "lending-4",
    name: "Wacom Intuos Pro Graphics Tablet",
    description: "Professional drawing tablet with wireless pen. Ideal for digital art, UI design, and editing tasks.",
    category: "Design",
    serialNumber: "SN-TAB-30219",
    status: "available",
    location: "Main Library, Media Lab (Room 204)",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400",
    qrCode: "QR-LEIHS-TAB01",
    kitId: null
  }
];

// Shelf Kits & Assets
const DEFAULT_KITS = [
  {
    _id: "kit-photo-1",
    name: "Complete Filmmaking Kit",
    description: "All-in-one kit for shooting high-quality video content on campus.",
    assets: [
      { name: "Sony Alpha 7 IV DSLR Body", serial: "SN-DSLR-74291", type: "Camera" },
      { name: "Manfrotto Professional Tripod", serial: "SN-TRI-9921", type: "Accessory" },
      { name: "Rode Wireless GO II Mic Kit", serial: "SN-MIC-4819", type: "Audio" }
    ],
    location: "Main Library, Media Lab (Room 204)",
    qrCode: "QR-KIT-FILM01",
    status: "available",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "kit-vr-1",
    name: "Immersive VR Development Kit",
    description: "Quest 2 headset bundled with Link Cable and Elite Strap for developers.",
    assets: [
      { name: "Oculus Quest 2 Headset", serial: "SN-VRH-09312", type: "VR Headset" },
      { name: "Oculus Link Fiber Optic Cable 5m", serial: "SN-CAB-1102", type: "Cable" },
      { name: "Quest 2 Elite Strap", serial: "SN-STR-5521", type: "Accessory" }
    ],
    location: "Engineering C-Block, Innovation Hub",
    qrCode: "QR-KIT-VRDEV",
    status: "borrowed",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=400"
  }
];

const DEFAULT_RESERVATIONS = [
  {
    _id: "res-1",
    itemId: "lending-2", // Epson Projector
    itemDetail: DEFAULT_LENDING_ITEMS[1],
    userId: "user-1",
    userFullName: "Anjali Bhavani",
    startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "approved", // pending, approved, active, returned, cancelled, overdue
    createdAt: new Date().toISOString()
  },
  {
    _id: "res-2",
    itemId: "lending-3", // Oculus Quest
    itemDetail: DEFAULT_LENDING_ITEMS[2],
    userId: "user-2",
    userFullName: "Aditya Raj",
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "overdue", // The return tracking shows this is overdue!
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_LOST_FOUND = [
  {
    _id: "lf-1",
    title: "Found: Car Key with leather keychain",
    description: "Found on the bench right outside the Library main entrance. Has a brown leather keychain.",
    type: "found",
    location: "Outside Main Library",
    category: "Keys",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400",
    reporter: DEFAULT_USERS[2], // Pranila
    resolved: false,
    questions: ["What is written on the back of the keychain?", "What color is the stitching on the leather?"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: "lf-2",
    title: "Lost: Apple AirPods Pro Case",
    description: "Lost my AirPods Pro case (empty case only). Might have dropped it in Engineering Block C, 3rd floor corridor. It has a blue silicon cover.",
    type: "lost",
    location: "Engineering Block C, 3rd Floor",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?auto=format&fit=crop&q=80&w=400",
    reporter: DEFAULT_USERS[1], // Aditya
    resolved: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_WANTED = [
  {
    _id: "wanted-1",
    title: "Need Lab Coat & Safety Goggles for Chemistry Lab",
    description: "Looking to borrow or buy a medium lab coat and goggles for this Friday lab session. Will return it same day.",
    category: "Academic",
    priceLimit: 150,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400",
    reporter: DEFAULT_USERS[1],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    offersCount: 2
  }
];

const DEFAULT_TRANSACTIONS = [
  {
    _id: "tx-1",
    item: DEFAULT_ITEMS[0], // Scientific calculator
    borrower: DEFAULT_USERS[0], // Anjali (Current User)
    lender: DEFAULT_USERS[1], // Aditya Raj
    status: "active", // pending, accepted, active, completed, disputed
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    price: 50,
    dispute: null,
    messages: [
      { senderId: "user-2", text: "Hey! When do you need the calculator?", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { senderId: "user-1", text: "Hi! I need it for the exam tomorrow. Can we meet at the library staircase?", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { senderId: "user-2", text: "Sure! Let's meet at 2 PM. I have handed it over to you.", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    _id: "notif-1",
    title: "Return Due Tomorrow",
    message: "Reminder: You are scheduled to return 'Casio fx-991EX' to Aditya Raj tomorrow.",
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    _id: "notif-2",
    title: "Reservation Approved",
    message: "Your reservation for 'Epson EH-TW7000 4K Projector' has been approved by the library admin.",
    read: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Initialize Mock Database
class MockDb {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem("sb_users")) {
      localStorage.setItem("sb_users", JSON.stringify(DEFAULT_USERS));
      localStorage.setItem("sb_items", JSON.stringify(DEFAULT_ITEMS));
      localStorage.setItem("sb_lending_items", JSON.stringify(DEFAULT_LENDING_ITEMS));
      localStorage.setItem("sb_kits", JSON.stringify(DEFAULT_KITS));
      localStorage.setItem("sb_reservations", JSON.stringify(DEFAULT_RESERVATIONS));
      localStorage.setItem("sb_lost_found", JSON.stringify(DEFAULT_LOST_FOUND));
      localStorage.setItem("sb_wanted", JSON.stringify(DEFAULT_WANTED));
      localStorage.setItem("sb_transactions", JSON.stringify(DEFAULT_TRANSACTIONS));
      localStorage.setItem("sb_notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
      localStorage.setItem("sb_claims", JSON.stringify([]));
    }
    
    // Set active user session
    if (!localStorage.getItem("sb_current_user")) {
      localStorage.setItem("sb_current_user", JSON.stringify(DEFAULT_USERS[0])); // Anjali
    }
    if (!localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", "mock-access-token-user-1");
      localStorage.setItem("refreshToken", "mock-refresh-token");
    }
  }

  getData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  setData(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  // --- Auth API ---
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("sb_current_user"));
  }

  login(email, password) {
    const users = this.getData("sb_users");
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem("sb_current_user", JSON.stringify(user));
      return { user, accessToken: "mock-access-token-" + user._id, refreshToken: "mock-refresh-token" };
    }
    throw new Error("Invalid credentials");
  }

  register(data) {
    const users = this.getData("sb_users");
    const newUser = {
      _id: "user-" + (users.length + 1),
      fullName: data.fullName || "New User",
      email: data.email,
      college: data.college || "Main Campus",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.fullName}`,
      trustScore: 90,
      ratings: 4.5,
      completedDeals: 0,
      role: "student"
    };
    users.push(newUser);
    this.setData("sb_users", users);
    localStorage.setItem("sb_current_user", JSON.stringify(newUser));
    return { user: newUser, accessToken: "mock-access-token-" + newUser._id, refreshToken: "mock-refresh-token" };
  }

  logout() {
    localStorage.removeItem("sb_current_user");
  }

  // --- Items API ---
  getItems(filters = {}) {
    let items = this.getData("sb_items");
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(item => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q));
    }
    if (filters.category) {
      items = items.filter(item => item.category === filters.category);
    }
    if (filters.mode) {
      items = items.filter(item => item.mode === filters.mode);
    }
    return items;
  }

  getMyItems() {
    const user = this.getCurrentUser();
    const items = this.getData("sb_items");
    return items.filter(item => item.owner._id === user._id);
  }

  getItem(id) {
    const items = this.getData("sb_items");
    return items.find(item => item._id === id);
  }

  createItem(data) {
    const items = this.getData("sb_items");
    const user = this.getCurrentUser();
    const newItem = {
      _id: "item-" + (items.length + 1),
      title: data.title,
      description: data.description,
      category: data.category,
      mode: data.mode,
      price: Number(data.price || 0),
      image: data.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      owner: user,
      availability: true,
      condition: data.condition || "Good",
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    this.setData("sb_items", items);
    return newItem;
  }

  updateItem(id, data) {
    const items = this.getData("sb_items");
    const idx = items.findIndex(item => item._id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...data };
      this.setData("sb_items", items);
      return items[idx];
    }
    return null;
  }

  deleteItem(id) {
    let items = this.getData("sb_items");
    items = items.filter(item => item._id !== id);
    this.setData("sb_items", items);
  }

  toggleItemAvailability(id) {
    const items = this.getData("sb_items");
    const idx = items.findIndex(item => item._id === id);
    if (idx !== -1) {
      items[idx].availability = !items[idx].availability;
      this.setData("sb_items", items);
      return items[idx];
    }
    return null;
  }

  // --- leihs Lending Items & Reservations API ---
  getLendingItems() {
    return this.getData("sb_lending_items");
  }

  getLendingItem(id) {
    const items = this.getLendingItems();
    return items.find(item => item._id === id);
  }

  createLendingItem(data) {
    const items = this.getLendingItems();
    const newItem = {
      _id: "lending-" + (items.length + 1),
      ...data,
      status: data.status || "available"
    };
    items.push(newItem);
    this.setData("sb_lending_items", items);
    return newItem;
  }

  updateLendingItem(id, data) {
    const items = this.getLendingItems();
    const idx = items.findIndex(item => item._id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...data };
      this.setData("sb_lending_items", items);
      return items[idx];
    }
    return null;
  }

  getKits() {
    return this.getData("sb_kits");
  }

  createKit(data) {
    const kits = this.getKits();
    const newKit = {
      _id: "kit-" + (kits.length + 1),
      ...data,
      status: "available"
    };
    kits.push(newKit);
    this.setData("sb_kits", kits);
    return newKit;
  }

  getReservations() {
    const reservations = this.getData("sb_reservations");
    const items = this.getLendingItems();
    // Map items to reservations
    return reservations.map(res => ({
      ...res,
      itemDetail: items.find(item => item._id === res.itemId)
    }));
  }

  createReservation(data) {
    const reservations = this.getData("sb_reservations");
    const items = this.getLendingItems();
    const user = this.getCurrentUser();
    
    // Check if item is already reserved
    const item = items.find(i => i._id === data.itemId);
    if (!item) throw new Error("Item not found");
    
    const newReservation = {
      _id: "res-" + (reservations.length + 1),
      itemId: data.itemId,
      userId: user._id,
      userFullName: user.fullName,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "pending", // pending approval from library admin
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    this.setData("sb_reservations", reservations);
    
    // Update item status to reserved
    item.status = "reserved";
    this.updateLendingItem(item._id, { status: "reserved" });
    
    return { ...newReservation, itemDetail: item };
  }

  updateReservationStatus(id, status) {
    const reservations = this.getData("sb_reservations");
    const idx = reservations.findIndex(res => res._id === id);
    if (idx !== -1) {
      reservations[idx].status = status;
      this.setData("sb_reservations", reservations);
      
      // Also update the item status based on reservation status
      const res = reservations[idx];
      const items = this.getLendingItems();
      const item = items.find(i => i._id === res.itemId);
      if (item) {
        if (status === "returned" || status === "cancelled") {
          item.status = "available";
        } else if (status === "active") {
          item.status = "borrowed";
        } else if (status === "overdue") {
          item.status = "borrowed";
        } else if (status === "approved") {
          item.status = "reserved";
        }
        this.updateLendingItem(item._id, { status: item.status });
      }
      return reservations[idx];
    }
    return null;
  }

  // --- Lost & Found API ---
  getLostFound() {
    return this.getData("sb_lost_found");
  }

  createLostFoundPost(data) {
    const posts = this.getLostFound();
    const user = this.getCurrentUser();
    const newPost = {
      _id: "lf-" + (posts.length + 1),
      title: data.title,
      description: data.description,
      type: data.type,
      location: data.location,
      category: data.category,
      image: data.image || null,
      reporter: user,
      resolved: false,
      questions: data.questions || [],
      createdAt: new Date().toISOString()
    };
    posts.push(newPost);
    this.setData("sb_lost_found", posts);
    return newPost;
  }

  getClaims() {
    return this.getData("sb_claims");
  }

  createClaim(postId, claimData) {
    const claims = this.getClaims();
    const user = this.getCurrentUser();
    const posts = this.getLostFound();
    const post = posts.find(p => p._id === postId);
    
    const newClaim = {
      _id: "claim-" + (claims.length + 1),
      postId,
      postTitle: post?.title || "",
      postReporter: post?.reporter || {},
      claimant: user,
      answers: claimData.answers || [],
      status: "pending", // pending, verifying, approved, rejected, completed
      meetupDetails: null,
      createdAt: new Date().toISOString()
    };
    
    claims.push(newClaim);
    this.setData("sb_claims", claims);
    return newClaim;
  }

  updateClaimStatus(claimId, status, details = {}) {
    const claims = this.getClaims();
    const idx = claims.findIndex(c => c._id === claimId);
    if (idx !== -1) {
      claims[idx].status = status;
      if (details.meetupDetails) {
        claims[idx].meetupDetails = details.meetupDetails;
      }
      if (details.reason) {
        claims[idx].rejectReason = details.reason;
      }
      this.setData("sb_claims", claims);
      return claims[idx];
    }
    return null;
  }

  // --- Wanted Items API ---
  getWantedItems() {
    return this.getData("sb_wanted");
  }

  createWantedItem(data) {
    const wanted = this.getWantedItems();
    const user = this.getCurrentUser();
    const newWanted = {
      _id: "wanted-" + (wanted.length + 1),
      title: data.title,
      description: data.description,
      category: data.category,
      priceLimit: Number(data.priceLimit || 0),
      reporter: user,
      createdAt: new Date().toISOString(),
      offersCount: 0
    };
    wanted.push(newWanted);
    this.setData("sb_wanted", wanted);
    return newWanted;
  }

  // --- Transactions API ---
  getTransactions() {
    return this.getData("sb_transactions");
  }

  getTransaction(id) {
    const txs = this.getTransactions();
    return txs.find(tx => tx._id === id);
  }

  createTransaction(data) {
    const txs = this.getTransactions();
    const user = this.getCurrentUser();
    const items = this.getData("sb_items");
    const item = items.find(i => i._id === data.itemId);
    
    const newTx = {
      _id: "tx-" + (txs.length + 1),
      item: item,
      borrower: user,
      lender: item.owner,
      status: "pending",
      startDate: data.startDate || new Date().toISOString(),
      endDate: data.endDate || new Date(Date.now() + 3*24*60*60*1000).toISOString(),
      price: item.price,
      messages: []
    };
    
    txs.push(newTx);
    this.setData("sb_transactions", txs);
    return newTx;
  }

  updateTransactionStatus(id, status, disputeData = null) {
    const txs = this.getTransactions();
    const idx = txs.findIndex(tx => tx._id === id);
    if (idx !== -1) {
      txs[idx].status = status;
      if (disputeData) {
        txs[idx].dispute = disputeData;
      }
      this.setData("sb_transactions", txs);
      return txs[idx];
    }
    return null;
  }

  sendMessage(txId, text) {
    const txs = this.getTransactions();
    const idx = txs.findIndex(tx => tx._id === txId);
    const user = this.getCurrentUser();
    if (idx !== -1) {
      const msg = {
        senderId: user._id,
        text,
        timestamp: new Date().toISOString()
      };
      txs[idx].messages.push(msg);
      this.setData("sb_transactions", txs);
      return txs[idx];
    }
    return null;
  }

  // --- Smart Matching Layer ---
  smartMatch(naturalLanguageQuery) {
    if (!naturalLanguageQuery || naturalLanguageQuery.trim() === "") {
      return { matches: [], extraction: null };
    }
    
    const query = naturalLanguageQuery.toLowerCase();
    
    // 1. Requirement Extraction
    const extraction = {
      resource: "",
      location: "",
      duration: "",
      mode: ""
    };
    
    // Keyword matching for resource
    if (query.includes("camera") || query.includes("dslr") || query.includes("lens") || query.includes("photo")) {
      extraction.resource = "DSLR Camera / Photography Equipment";
    } else if (query.includes("calculator") || query.includes("casio")) {
      extraction.resource = "Scientific Calculator";
    } else if (query.includes("projector") || query.includes("av") || query.includes("epson")) {
      extraction.resource = "Projector / Display Equipment";
    } else if (query.includes("vr") || query.includes("quest") || query.includes("oculus")) {
      extraction.resource = "VR Headset / Gaming Gear";
    } else if (query.includes("book") || query.includes("textbook") || query.includes("physics")) {
      extraction.resource = "Academic Textbook";
    } else if (query.includes("kettle") || query.includes("induction")) {
      extraction.resource = "Electric Kettle / Cooking Appliance";
    } else if (query.includes("tablet") || query.includes("wacom") || query.includes("ipad")) {
      extraction.resource = "Graphics Tablet / Digital Canvas";
    } else {
      extraction.resource = "General Equipment / Item";
    }

    // Keyword matching for location
    if (query.includes("library") || query.includes("media lab") || query.includes("room 204")) {
      extraction.location = "Main Library";
    } else if (query.includes("engineering") || query.includes("block c") || query.includes("block a")) {
      extraction.location = "Engineering Block";
    } else if (query.includes("hostel") || query.includes("room")) {
      extraction.location = "Hostel / Residence";
    } else {
      extraction.location = "Any Campus Location";
    }

    // Keyword matching for duration
    if (query.includes("weekend") || query.includes("saturday") || query.includes("sunday")) {
      extraction.duration = "Weekend Borrowing (2-3 Days)";
    } else if (query.includes("month") || query.includes("semester")) {
      extraction.duration = "Long-term (1 Month+)";
    } else if (query.includes("today") || query.includes("hour") || query.includes("now")) {
      extraction.duration = "Short-term (1 Day / Hours)";
    } else {
      extraction.duration = "Standard Period (3-5 Days)";
    }

    // Extraction Mode
    if (query.includes("rent") || query.includes("pay")) {
      extraction.mode = "Rent";
    } else if (query.includes("borrow") || query.includes("free") || query.includes("lend")) {
      extraction.mode = "Borrow / Share";
    } else {
      extraction.mode = "Any Mode";
    }

    // 2. Multi-Resource Smart Matching
    const matches = [];

    // Search ShareNet items (Marketplace)
    const items = this.getData("sb_items");
    items.forEach(item => {
      let score = 50; // base score
      const breakdown = [];

      const titleMatch = item.title.toLowerCase().split(/\s+/).some(word => word.length > 2 && query.includes(word));
      const descMatch = item.description.toLowerCase().split(/\s+/).some(word => word.length > 2 && query.includes(word));
      if (titleMatch || descMatch) {
        score += 30;
        breakdown.push({ criteria: "Item type relevance", points: 30, matched: true });
      } else {
        breakdown.push({ criteria: "Item type relevance", points: 0, matched: false });
      }

      if (extraction.mode === "Any Mode" || (extraction.mode === "Rent" && item.mode === "rent") || (extraction.mode === "Borrow / Share" && item.mode === "share")) {
        score += 10;
        breakdown.push({ criteria: "Fulfillment mode", points: 10, matched: true });
      } else {
        breakdown.push({ criteria: "Fulfillment mode", points: 0, matched: false });
      }

      score += 10;
      breakdown.push({ criteria: "Campus proximity", points: 10, matched: true });

      const trustBonus = Math.round((item.owner.trustScore - 80) / 2);
      if (trustBonus > 0) {
        score += trustBonus;
        breakdown.push({ criteria: `Owner Trust reputation (${item.owner.trustScore}%)`, points: trustBonus, matched: true });
      }

      if (score > 60) {
        matches.push({
          type: "ShareNet Marketplace",
          title: item.title,
          description: item.description,
          image: item.image,
          sourceId: item._id,
          location: "Campus Pick-up (Negotiable)",
          condition: item.condition,
          availability: item.availability ? "Available" : "Checked Out",
          price: item.mode === "rent" ? `₹${item.price}/day` : "Free Share",
          score: Math.min(100, score),
          breakdown,
          detailsUrl: `/items/${item._id}`
        });
      }
    });

    // Search leihs Equipment items
    const lendingItems = this.getData("sb_lending_items");
    lendingItems.forEach(item => {
      let score = 55;
      const breakdown = [];

      const titleMatch = item.name.toLowerCase().split(/\s+/).some(word => word.length > 2 && query.includes(word));
      if (titleMatch) {
        score += 35;
        breakdown.push({ criteria: "Item type relevance", points: 35, matched: true });
      } else {
        breakdown.push({ criteria: "Item type relevance", points: 0, matched: false });
      }

      const locMatch = item.location.toLowerCase().includes(extraction.location.toLowerCase()) || (extraction.location === "Main Library" && item.location.toLowerCase().includes("library"));
      if (locMatch) {
        score += 15;
        breakdown.push({ criteria: `Exact storage location (${item.location})`, points: 15, matched: true });
      } else {
        breakdown.push({ criteria: "Location proximity", points: 5, matched: false });
      }

      if (item.status === "available") {
        score += 10;
        breakdown.push({ criteria: "Instant availability", points: 10, matched: true });
      } else {
        score -= 20;
        breakdown.push({ criteria: "Currently reserved/borrowed", points: -20, matched: false });
      }

      if (item.condition === "Excellent") {
        score += 5;
        breakdown.push({ criteria: "Premium hardware condition (Excellent)", points: 5, matched: true });
      }

      if (score > 60) {
        matches.push({
          type: "leihs Equipment Library",
          title: item.name,
          description: item.description,
          image: item.image,
          sourceId: item._id,
          location: item.location,
          condition: item.condition,
          availability: item.status === "available" ? "Available (Instant Reserve)" : (item.status === "reserved" ? "Reserved" : "Checked Out"),
          price: "Free Academic Borrowing",
          score: Math.min(100, Math.max(0, score)),
          breakdown,
          detailsUrl: `/lending`
        });
      }
    });

    // Search Shelf Kits
    const kits = this.getData("sb_kits");
    kits.forEach(kit => {
      let score = 55;
      const breakdown = [];

      const titleMatch = kit.name.toLowerCase().split(/\s+/).some(word => word.length > 2 && query.includes(word)) || kit.assets.some(a => a.name.toLowerCase().includes(query.split(" ")[0]));
      if (titleMatch) {
        score += 35;
        breakdown.push({ criteria: "Kit bundle relevance", points: 35, matched: true });
      } else {
        breakdown.push({ criteria: "Kit bundle relevance", points: 0, matched: false });
      }

      const locMatch = kit.location.toLowerCase().includes(extraction.location.toLowerCase()) || (extraction.location === "Main Library" && kit.location.toLowerCase().includes("library"));
      if (locMatch) {
        score += 15;
        breakdown.push({ criteria: `Exact kit storage area (${kit.location})`, points: 15, matched: true });
      } else {
        breakdown.push({ criteria: "Location proximity", points: 5, matched: false });
      }

      if (kit.status === "available") {
        score += 10;
        breakdown.push({ criteria: "Full kit package available", points: 10, matched: true });
      } else {
        score -= 15;
        breakdown.push({ criteria: "Kit assets checked out", points: -15, matched: false });
      }

      if (score > 60) {
        matches.push({
          type: "Shelf Kit Bundle",
          title: kit.name,
          description: `${kit.description} Contains: ${kit.assets.map(a => a.name).join(", ")}.`,
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
          sourceId: kit._id,
          location: kit.location,
          condition: "Excellent (Certified Kit)",
          availability: kit.status === "available" ? "Available" : "Borrowed",
          price: "Academic Use",
          score: Math.min(100, Math.max(0, score)),
          breakdown,
          detailsUrl: `/assets`
        });
      }
    });

    matches.sort((a, b) => b.score - a.score);

    return { matches, extraction };
  }
}

const mockDb = new MockDb();
export default mockDb;
