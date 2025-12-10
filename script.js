// Navbar Transition on Scroll
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search Button functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            // In a real app, you would redirect to search page:
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            searchInput.value = ''; // Clear input for demo
        } else {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active'); // Add this line
    // Toggle hamburger icon to close
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active'); // Add this line
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(element => {
    observer.observe(element);
});

// Testimonials Slider: Duplicate info for infinite loop
const sliderTrack = document.getElementById('slider-track');
if (sliderTrack) {
    const cards = sliderTrack.innerHTML;
    sliderTrack.innerHTML += cards; // Duplicate content once to create the loop
}

// Property Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        propertyCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Trigger animation reset
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Service Areas Logic
const serviceAreas = [
    "Abbott", "Abilene", "Adamsville", "Addison", "Alba", "Albany", "Aledo", "Allen", "Alvarado", "Alvin", "Alvord", "Amarillo", "Ames", "Andrews", "Anna", "Annona", "Anson",
    "Aquilla", "Archer City", "Ardmore", "Argyle", "Arlington", "Arp", "Arthur City", "Aspermont", "Athens", "Atlanta", "Aubrey", "Aurora", "Austin", "Avalon", "Avery", "Avinger",
    "Axtell", "Azle", "Bagwell", "Bailey", "Baird", "Balch Springs", "Bangs", "Barry", "Bartonville", "Bastrop", "Beckville", "Bedford", "Belize", "Bellevue", "Bellmead", "Bells",
    "Belton", "Ben Franklin", "Ben Wheeler", "Benbrook", "Berryville", "Beverly Hills", "Big Sandy", "Big Spring", "Blackwell", "Blanket", "Blooming Grove", "Blossom", "Blue Mound",
    "Blue Ridge", "Bluff Dale", "Blum", "Bogata", "Bonham", "Bowie", "Boyd", "Brady", "Brashear", "Breckenridge", "Brenham", "Bridgeport", "Brock", "Broken Bow", "Bronte", "Brookesmith",
    "Brookston", "Brownsboro", "Brownwood", "Bruceville Eddy", "Bryan", "Bryson", "Buffalo", "Buffalo Gap", "Bullard", "Burkburnett", "Burleson", "Burton", "Byers", "Bynum", "Cabo San Lucas",
    "Caddo", "Caddo Mills", "Caldwell", "Calera", "Callisburg", "Campbell", "Caney City", "Canton", "Carbon", "Carlton", "Carmine", "Carrollton", "Carthage", "Cartwright", "Cedar Creek Lake",
    "Cedar Hill", "Cedar Park", "Celeste", "Celina", "Center City", "Centerville", "Chandler", "Chatfield", "Cherokee", "Chico", "Childress", "China Spring", "Chireno", "Cisco", "Clarksville",
    "Cleburne", "Cleveland", "Clifton", "Clyde", "Cockrell Hill", "Coleman", "College Station", "Colleyville", "Collinsville", "Colorado City", "Comanche", "Combine", "Commerce", "Como",
    "Conroe", "Cookville", "Coolidge", "Cooper", "Coppell", "Copper Canyon", "Copperas Cove", "Corinth", "Corsicana", "Costa Rica", "Covington", "Crandall", "Cranfills Gap", "Crawford",
    "Cresson", "Crockett", "Cross Plains", "Cross Roads", "Crowley", "Crystal Beach", "Cuero", "Cumby", "Cunningham", "Daingerfield", "Dallas", "Dalworthington Gardens", "Dawson", "Dayton",
    "De Cordova", "De Kalb", "De Leon", "DeSoto", "Decatur", "Del Rio", "Denison", "Denton", "Deport", "Desdemona", "Detroit", "Dew", "Diana", "Dike", "Dish", "Dodd City", "Domino",
    "Donie", "Dorchester", "Double Oak", "Dublin", "Duncan", "Duncanville", "Durant", "Early", "East Tawakoni", "Eastland", "Ector", "Edgecliff Village", "Edgewood", "Edom", "El Paso",
    "Eldorado", "Elkhart", "Emhouse", "Emory", "Enchanted Oaks", "Energy", "Enloe", "Ennis", "Era", "Eula", "Euless", "Eustace", "Evant", "Everman", "Fairfield", "Fairview", "Fairy",
    "Farmers Branch", "Farmersville", "Fate", "Ferris", "Flint", "Flower Mound", "Forest Hill", "Forestburg", "Forney", "Forreston", "Fort Worth", "Frankston", "Fredericksburg", "Frisco",
    "Frost", "Fruitvale", "Gainesville", "Galveston", "Garland", "Garrett", "Gatesville", "Georgetown", "Gholson", "Gilchrist", "Gilmer", "Gladewater", "Glen Rose", "Glenn Heights",
    "Godley", "Goldthwaite", "Gordon", "Gordonville", "Goree", "Gorman", "Gouldbusk", "Graford", "Graham", "Granbury", "Grand Cayman", "Grand Prairie", "Grand Saline", "Grandview",
    "Grapeland", "Grapevine", "Greenville", "Groesbeck", "Groveton", "Gun Barrel City", "Gunter", "Gustine", "Hackberry", "Hallsville", "Haltom City", "Hamilton", "Hamlin", "Harleton",
    "Hartsel", "Haskell", "Haslet", "Hawk Cove", "Hawkins", "Hawley", "Heartland", "Heath", "Helena", "Henderson", "Henrietta", "Hewitt", "Hickory Creek", "Hico", "Hideaway",
    "Highland Park", "Highland Village", "Hillsboro", "Holland", "Holliday", "Holly Lake Ranch", "Honey Grove", "Horseshoe Bay", "Houston", "Howe", "Hubbard", "Hudson Oaks", "Huntsville",
    "Hurst", "Hutchins", "Iowa Park", "Iredell", "Irving", "Italy", "Itasca", "Ivanhoe", "Jacksboro", "Jacksonville", "Jayton", "Jefferson", "Jermyn", "Jewett", "Jonesboro", "Jonestown",
    "Josephine", "Joshua", "Justin", "Karnack", "Katy", "Kaufman", "Keene", "Keller", "Kemp", "Kempner", "Kennard", "Kennedale", "Kerens", "Kerrville", "Kilgore", "Killeen", "Kingsland",
    "Kingston", "Klondike", "Knox City", "Kopperl", "Kosse", "Krugerville", "Krum", "Lacy Lakeview", "Ladonia", "Laguna Park", "Lake Brownwood", "Lake Creek", "Lake Dallas", "Lake Kiowa",
    "Lake Worth", "Lakeside", "Lakewood Village", "Lampasas", "Lancaster", "Lantana", "Laredo", "Larue", "Lavon", "Lawn", "Leander", "Leesburg", "Leon", "Leonard", "Lewisville", "Liberty",
    "Lindale", "Linden", "Lindsay", "Lingleville", "Lipan", "Little Elm", "Livingston", "Log Cabin", "Lohn", "Lometa", "Lone Oak", "Lone Star", "Long Branch", "Longview", "Lovelady",
    "Loving", "Lowry Crossing", "Lubbock", "Lucas", "Lueders", "Mabank", "Magnolia", "Malakoff", "Malone", "Mansfield", "Marble Falls", "Marietta", "Marlin", "Marshall", "Mart", "Mason",
    "Matador", "May", "Maypearl", "Mc Gregor", "McCaulley", "McKinney", "McLendon Chisholm", "Megargel", "Melissa", "Memphis", "Menard", "Mercury", "Meridian", "Merkel", "Mertens",
    "Mesquite", "Mexia", "Midland", "Midlothian", "Mildred", "Milford", "Millsap", "Mineola", "Mineral Wells", "Mingus", "Montague", "Montalba", "Morgan", "Morgan Mill", "Mount Calm",
    "Mount Pleasant", "Mount Vernon", "Moyers", "Muenster", "Mullin", "Munday", "Murchison", "Murphy", "Myra", "Nacogdoches", "Naples", "Navarro", "Nemo", "Nevada", "New Boston",
    "New Fairview", "New Hope", "New Waverly", "Newark", "Newcastle", "Newton", "No City", "Nocona", "Normangee", "North Richland Hills", "Northlake", "OBrien", "Oak Leaf", "Oak Point",
    "Oak Ridge", "Oakwood", "Odessa", "Olden", "Olney", "Omaha", "Ore City", "Ovalo", "Overton", "Ovilla", "Ozona", "Paducah", "Palestine", "Palmer", "Palo Pinto", "Pampa", "Pantego",
    "Paradise", "Paris", "Parker", "Pasadena", "Pattonville", "Payne Springs", "Peaster", "Pecan Gap", "Pecos", "Pelican Bay", "Penelope", "Perrin", "Petrolia", "Petty", "Pickton",
    "Pilot Point", "Pittsburg", "Plainview", "Plano", "Pleasanton", "Point", "Ponder", "Poolville", "Port Aransas", "Port Lavaca", "Possum Kingdom Lake", "Poteet", "Pottsboro",
    "Powderly", "Powell", "Poynor", "Priddy", "Princeton", "Proctor", "Prosper", "Providence Village", "Purdon", "Purmela", "Quinlan", "Quitman", "Rainbow", "Randolph", "Ranger",
    "Ravenna", "Red Oak", "Reno", "Retreat", "Rhome", "Rice", "Richardson", "Richland", "Richland Hills", "Richland Springs", "Ringgold", "Rio Vista", "Rising Star", "River Oaks",
    "Roanoke", "Robinson", "Roby", "Rochelle", "Rochester", "Rockdale", "Rockport", "Rockwall", "Rockwood", "Rosser", "Rosston", "Rotan", "Rowlett", "Roxton", "Royse City", "Rule",
    "Runaway Bay", "Rusk", "Sachse", "Sadler", "Saginaw", "Saint Jo", "Saltillo", "San Angelo", "San Antonio", "San Augustine", "San Saba", "Sanger", "Sansom Park", "Santa Anna",
    "Santo", "Sao Paulo", "Savannah", "Savoy", "Scotland", "Scroggins", "Scurry", "Seagoville", "Sedona", "Seguin", "Seven Points", "Seymour", "Shady Shores", "Shamrock", "Sherman",
    "Sidney", "Silsbee", "Sinton", "Snyder", "Somerset", "South Padre Island", "Southlake", "Southmayd", "Springtown", "St. Paul", "Stamford", "Star Harbor", "Stephenville", "Strawn",
    "Streetman", "Sulphur Bluff", "Sulphur Springs", "Sumner", "Sunnyvale", "Sunset", "Sweetwater", "Talco", "Talpa", "Talty", "Tatum", "Teague", "Telephone", "Temple", "Terrell",
    "Texarkana", "Thackerville", "The Colony", "The Woodlands", "Thornton", "Throckmorton", "Tioga", "Tolar", "Tom Bean", "Tool", "Trent", "Trenton", "Trinidad", "Trinity", "Trophy Club",
    "Troup", "Troy", "Turkey", "Tuscola", "Tye", "Tyler", "Ubatuba", "Union Valley", "University Park", "Valley Mills", "Valley View", "Van", "Van Alstyne", "Venus", "Vernon", "Voca",
    "Voss", "Waco", "Waller", "Walnut Springs", "Waskom", "Watauga", "Waxahachie", "Weatherford", "Wellington", "West", "West Tawakoni", "Westbrook", "Westlake", "Westminster",
    "Weston", "Westover Hills", "Westworth Village", "Wheeler", "White Settlement", "Whitehouse", "Whitesboro", "Whitewright", "Whitney", "Whitt", "Wichita Falls", "Willis", "Willow Park",
    "Wills Point", "Wilmer", "Windthorst", "Wingate", "Winnsboro", "Winona", "Winters", "Wolfe City", "Woodson", "Wortham", "Wylie", "Yantis", "Zephyr"
];

const areasGrid = document.getElementById('areas-grid');
const areaSearchInput = document.getElementById('area-search-input');
const showMoreBtn = document.getElementById('show-more-areas');

let visibleAreasCount = window.innerWidth < 768 ? 10 : 24; // Initial number of areas to show (fewer on mobile)
let currentFilteredAreas = [...serviceAreas];

function renderAreas() {
    if (!areasGrid) return;

    areasGrid.innerHTML = '';
    const areasToShow = currentFilteredAreas.slice(0, visibleAreasCount);

    if (areasToShow.length === 0) {
        areasGrid.innerHTML = '<div class="no-results">No areas found matching your search.</div>';
    } else {
        areasToShow.forEach(area => {
            const areaItem = document.createElement('div');
            areaItem.classList.add('area-item');
            areaItem.textContent = area;
            // Add click interaction (animate and maybe alert or log)
            areaItem.addEventListener('click', () => {
                // Feedback effect
                areaItem.style.transform = 'scale(0.95)';
                setTimeout(() => areaItem.style.transform = 'translateY(-3px)', 150);
            });
            areasGrid.appendChild(areaItem);
        });
    }

    // Handle "Show More" visibility
    const paginationContainer = document.querySelector('.areas-pagination');
    if (paginationContainer) {
        if (visibleAreasCount >= currentFilteredAreas.length) {
            paginationContainer.style.display = 'none';
        } else {
            paginationContainer.style.display = 'block';
        }
    }
}

if (areaSearchInput) {
    areaSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        currentFilteredAreas = serviceAreas.filter(area =>
            area.toLowerCase().includes(query)
        );
        visibleAreasCount = 24; // Reset visible count on search
        renderAreas();
    });
}

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        visibleAreasCount += 24;
        renderAreas();
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', renderAreas);
renderAreas();

