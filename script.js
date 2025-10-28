// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const budgetSections = document.querySelectorAll('.budget-section');

// Function to open YouTube video in new tab
function openYouTube(url) {
    window.open(url, '_blank');
}



// Tab switching functionality
function switchTab(tabId) {
    // Remove active class from all tabs and sections
    tabButtons.forEach(btn => btn.classList.remove('active'));
    budgetSections.forEach(section => section.classList.remove('active'));
    
    // Add active class to selected tab and section
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    const activeSection = document.getElementById(tabId);
    
    if (activeTab && activeSection) {
        activeTab.classList.add('active');
        activeSection.classList.add('active');
    }
}





// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    


});

// Initialize with first tab active
switchTab('budget-100');



// Budget input functionality
const budgetInput = document.getElementById('budgetInput');
const findIdeaBtn = document.getElementById('findIdeaBtn');
const budgetResult = document.getElementById('budgetResult');
const resultBudget = document.getElementById('resultBudget');
const resultCard = document.getElementById('resultCard');

// All ideas database for budget search
const allIdeasForBudget = [
    // Under $100 ideas
    {
        title: 'Telegram Bot Assistant',
        budget: 60,
        description: 'Create a niche bot (reminders, AI tools, crypto alerts) and sell it as a service.',
        tags: ['#automation', '#digital'],
        videoId: '8TMKfSDORAc'
    },
    {
        title: 'Digital Product Templates',
        budget: 45,
        description: 'Create and sell Notion templates, Excel sheets, or design templates on marketplaces.',
        tags: ['#digital', '#passive'],
        videoId: 'jHo-FO_OLv4'
    },
    {
        title: 'Social Media Management',
        budget: 80,
        description: 'Offer social media management services for small businesses and startups.',
        tags: ['#digital', '#service'],
        videoId: 'dVbuAUT1LxE'
    },
    {
        title: 'Content Writing Services',
        budget: 75,
        description: 'Start a freelance content writing business for blogs, websites, and marketing materials.',
        tags: ['#writing', '#freelance'],
        videoId: '90Vvoffk9XM'
    },
    {
        title: 'Virtual Assistant',
        budget: 90,
        description: 'Offer virtual assistant services including email management, scheduling, and administrative tasks.',
        tags: ['#service', '#remote'],
        videoId: 'kQBKfy3fAzQ'
    },
    {
        title: 'Graphic Design Services',
        budget: 85,
        description: 'Create logos, social media graphics, and marketing materials for small businesses.',
        tags: ['#creative', '#design'],
        videoId: 'cbMiUSpln8Y'
    },

    
    // Under $500 ideas
    {
        title: 'E-commerce Niche Store',
        budget: 400,
        description: 'Build a specialized online store focusing on a specific product category or audience.',
        tags: ['#ecommerce', '#niche'],
        videoId: 'wq1GDVwWz3g'
    },
    {
        title: 'Mobile App Development',
        budget: 450,
        description: 'Create a simple mobile app using no-code platforms or learn basic development skills.',
        tags: ['#tech', '#mobile'],
        videoId: 'yye7rSsiV6k'
    },
    {
        title: 'Online Course Creation',
        budget: 350,
        description: 'Develop and sell online courses on platforms like Udemy, Teachable, or your own website.',
        tags: ['#education', '#passive'],
        videoId: 'oTQPxPFROck'
    },
    {
        title: 'Print-on-Demand Business',
        budget: 420,
        description: 'Create custom designs and sell them on t-shirts, mugs, and other products through print-on-demand platforms.',
        tags: ['#ecommerce', '#creative'],
        videoId: 'XTKU8qVHwgM'
    },
    {
        title: 'Web Development Services',
        budget: 480,
        description: 'Build websites for small businesses using WordPress, Wix, or custom development skills.',
        tags: ['#tech', '#service'],
        videoId: 'tVphpcFHGaI'
    },
    {
        title: 'Digital Marketing Agency',
        budget: 380,
        description: 'Offer SEO, PPC, and social media marketing services to help businesses grow their online presence.',
        tags: ['#marketing', '#digital'],
        videoId: 'EiWILQkgC2c'
    },

    
    // Under $1000 ideas
    {
        title: 'SaaS Product Development',
        budget: 950,
        description: 'Build a software-as-a-service product using no-code tools or basic development skills.',
        tags: ['#tech', '#saas'],
        videoId: 'lxpaSlImFHk'
    },
    {
        title: 'Franchise Investment',
        budget: 900,
        description: 'Invest in a low-cost franchise opportunity in food service, retail, or services.',
        tags: ['#franchise', '#business'],
        videoId: 'VrQa-CWvgv4'
    },
    {
        title: 'Real Estate Investment',
        budget: 980,
        description: 'Start with REITs, crowdfunding platforms, or small real estate investments.',
        tags: ['#investment', '#real-estate'],
        videoId: 'WlqYhER9Dd8'
    },
    {
        title: 'E-commerce Brand Building',
        budget: 850,
        description: 'Create your own brand and sell products through multiple channels including Amazon, Shopify, and social media.',
        tags: ['#ecommerce', '#branding'],
        videoId: '9K8FbIKXkbw'
    },
    {
        title: 'AI-Powered Business Tools',
        budget: 920,
        description: 'Develop AI-powered tools and applications to solve specific business problems and automate processes.',
        tags: ['#ai', '#automation'],
        videoId: 'Ej9zCLI2ZdY'
    },
    {
        title: 'Subscription Box Service',
        budget: 750,
        description: 'Create a subscription box service in a niche market with curated products delivered monthly.',
        tags: ['#subscription', '#recurring'],
        videoId: 'b_1QM4Dyy7w'
    },

];

// Find idea for budget
function findIdeaForBudget(budget) {
    // Filter ideas that fit within the budget
    const affordableIdeas = allIdeasForBudget.filter(idea => idea.budget <= budget);
    
    if (affordableIdeas.length === 0) {
        return null;
    }
    
    // Sort by budget efficiency (highest value for money)
    affordableIdeas.sort((a, b) => {
        const aEfficiency = a.budget / budget;
        const bEfficiency = b.budget / budget;
        return aEfficiency - bEfficiency; // Lower is better (spends less of budget)
    });
    
    // Return the most budget-efficient idea
    return affordableIdeas[0];
}

// Display result
function displayBudgetResult(idea, userBudget) {
    resultBudget.textContent = `$${userBudget}`;
    
    resultCard.innerHTML = `
        <div class="idea-card">
            <div class="card-header">
                <h3>${idea.title}</h3>
                <span class="budget">$${idea.budget}</span>
            </div>
            <p>${idea.description}</p>
            <div class="video-preview">
                <div class="preview-image" style="background-image: url('https://img.youtube.com/vi/${idea.videoId}/maxresdefault.jpg');">
                    <div class="play-button" onclick="openYouTube('https://www.youtube.com/watch?v=${idea.videoId}')">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="card-tags">
                ${idea.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    budgetResult.style.display = 'block';
    
    // Smooth scroll to result
    budgetResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Event listeners for budget search
findIdeaBtn.addEventListener('click', () => {
    const budget = parseInt(budgetInput.value);
    
    if (!budget || budget <= 0) {
        alert('Please enter a valid budget amount.');
        return;
    }
    
    const recommendedIdea = findIdeaForBudget(budget);
    
    if (recommendedIdea) {
        displayBudgetResult(recommendedIdea, budget);
    } else {
        // Show message for very low budgets
        resultBudget.textContent = `$${budget}`;
        resultCard.innerHTML = `
            <div class="idea-card">
                <div class="card-header">
                    <h3>Budget Too Low</h3>
                    <span class="budget">$${budget}</span>
                </div>
                <p>Your budget of $${budget} is too low for our current business ideas. Consider saving more or starting with our "Under $100" category for the most affordable options.</p>
                <div class="card-tags">
                    <span class="tag">#savings</span>
                    <span class="tag">#planning</span>
                </div>
            </div>
        `;
        budgetResult.style.display = 'block';
        budgetResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Allow Enter key to trigger search
budgetInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        findIdeaBtn.click();
    }
});

// Modal functionality
const modal = document.getElementById('ideaModal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modalTitle');
const modalBudget = document.getElementById('modalBudget');
const modalSteps = document.getElementById('modalSteps');

// Idea implementation plans
const ideaPlans = {
    'Telegram Bot Assistant': {
        budget: '$60',
        steps: [
            {
                number: 'Step 1',
                title: 'Research & Planning',
                description: 'Identify a specific niche market (crypto alerts, fitness reminders, business tools). Research existing bots in your chosen niche to understand gaps and opportunities.',
                tips: 'Focus on solving a real problem that people are willing to pay for.'
            },
            {
                number: 'Step 2',
                title: 'Choose Development Platform',
                description: 'Select a bot development platform: BotFather for Telegram, or use no-code tools like ManyChat, Chatfuel, or Bubble for more complex bots.',
                tips: 'Start with simple functionality and add features gradually.'
            },
            {
                number: 'Step 3',
                title: 'Design Bot Features',
                description: 'Create user flows, design conversation paths, and plan key features like automated responses, data collection, and integration capabilities.',
                tips: 'Keep the user experience simple and intuitive.'
            },
            {
                number: 'Step 4',
                title: 'Develop & Test',
                description: 'Build your bot using the chosen platform. Test thoroughly with real users to ensure smooth functionality and user experience.',
                tips: 'Start with a beta version and gather feedback before launching.'
            },
            {
                number: 'Step 5',
                title: 'Marketing & Sales',
                description: 'Create a landing page, showcase your bot on social media, and reach out to potential clients in your target niche.',
                tips: 'Offer a free trial or demo to attract initial customers.'
            }
        ]
    },
    'Digital Product Templates': {
        budget: '$45',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Niche',
                description: 'Select a specific market: productivity templates, business planners, creative designs, or educational resources. Research what\'s selling well.',
                tips: 'Look for underserved niches with high demand.'
            },
            {
                number: 'Step 2',
                title: 'Create High-Quality Templates',
                description: 'Design professional templates using tools like Canva, Notion, or Excel. Focus on solving specific problems for your target audience.',
                tips: 'Quality over quantity - make each template valuable.'
            },
            {
                number: 'Step 3',
                title: 'Choose Sales Platforms',
                description: 'List your templates on marketplaces like Etsy, Creative Market, Gumroad, or your own website. Consider multiple platforms for wider reach.',
                tips: 'Start with popular platforms to build your reputation.'
            },
            {
                number: 'Step 4',
                title: 'Marketing Strategy',
                description: 'Create compelling product descriptions, use high-quality images, and leverage social media to showcase your templates.',
                tips: 'Use Pinterest and Instagram to showcase your designs.'
            },
            {
                number: 'Step 5',
                title: 'Scale & Optimize',
                description: 'Analyze sales data, gather customer feedback, and continuously improve your templates. Consider creating template bundles or premium versions.',
                tips: 'Listen to customer feedback to improve future products.'
            }
        ]
    },
    'Social Media Management': {
        budget: '$80',
        steps: [
            {
                number: 'Step 1',
                title: 'Define Your Services',
                description: 'Decide on your service offerings: content creation, community management, analytics, or full social media strategy. Choose your target market.',
                tips: 'Start with a specific niche to stand out from competitors.'
            },
            {
                number: 'Step 2',
                title: 'Build Your Portfolio',
                description: 'Create sample content, design mock-ups, and develop case studies. Build your own social media presence to showcase your skills.',
                tips: 'Your personal brand is your best marketing tool.'
            },
            {
                number: 'Step 3',
                title: 'Set Up Your Business',
                description: 'Create a professional website, set up business accounts, and establish your pricing structure. Consider different service tiers.',
                tips: 'Start with competitive pricing to build your client base.'
            },
            {
                number: 'Step 4',
                title: 'Find Your First Clients',
                description: 'Network with local businesses, use freelance platforms like Upwork, and leverage your personal network to find initial clients.',
                tips: 'Offer a free audit or consultation to attract potential clients.'
            },
            {
                number: 'Step 5',
                title: 'Deliver & Scale',
                description: 'Provide excellent service, gather testimonials, and use results to attract larger clients. Consider hiring team members as you grow.',
                tips: 'Focus on measurable results to justify your pricing.'
            }
        ]
    },
    'E-commerce Niche Store': {
        budget: '$400',
        steps: [
            {
                number: 'Step 1',
                title: 'Market Research',
                description: 'Identify a profitable niche with low competition but high demand. Research trending products, analyze competitors, and validate your idea.',
                tips: 'Use tools like Google Trends and Amazon Best Sellers for research.'
            },
            {
                number: 'Step 2',
                title: 'Choose Your Platform',
                description: 'Select an e-commerce platform: Shopify, WooCommerce, or BigCommerce. Consider your budget, technical skills, and business needs.',
                tips: 'Start with Shopify for ease of use and quick setup.'
            },
            {
                number: 'Step 3',
                title: 'Design & Branding',
                description: 'Create a professional brand identity, design your store, and optimize for user experience. Focus on mobile-first design.',
                tips: 'Invest in professional product photography for better conversions.'
            },
            {
                number: 'Step 4',
                title: 'Product Sourcing',
                description: 'Find reliable suppliers through AliExpress, local manufacturers, or dropshipping partners. Test products before full commitment.',
                tips: 'Start with a small inventory to test market demand.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Market',
                description: 'Launch your store with a marketing strategy including social media, email marketing, and paid advertising. Focus on building customer relationships.',
                tips: 'Use social proof and customer testimonials to build trust.'
            }
        ]
    },
    'Mobile App Development': {
        budget: '$450',
        steps: [
            {
                number: 'Step 1',
                title: 'Idea Validation',
                description: 'Research your app idea thoroughly. Check existing apps, identify your unique value proposition, and validate demand through surveys.',
                tips: 'Focus on solving a specific problem rather than creating a general app.'
            },
            {
                number: 'Step 2',
                title: 'Choose Development Approach',
                description: 'Decide between native development, cross-platform tools (React Native, Flutter), or no-code platforms like Bubble or Glide.',
                tips: 'No-code platforms are great for MVPs and testing ideas quickly.'
            },
            {
                number: 'Step 3',
                title: 'Design & Prototype',
                description: 'Create wireframes and prototypes using tools like Figma or Adobe XD. Focus on user experience and intuitive navigation.',
                tips: 'Test your prototype with potential users before development.'
            },
            {
                number: 'Step 4',
                title: 'Development & Testing',
                description: 'Build your app using your chosen platform. Test thoroughly on different devices and gather feedback from beta users.',
                tips: 'Start with core features and add complexity gradually.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Monetize',
                description: 'Publish your app on app stores, implement monetization strategies (ads, subscriptions, in-app purchases), and market your app.',
                tips: 'Focus on user acquisition and retention for sustainable growth.'
            }
        ]
    },
    'Online Course Creation': {
        budget: '$350',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Topic',
                description: 'Select a subject you\'re passionate about and knowledgeable in. Research market demand and identify your target audience.',
                tips: 'Choose a topic with high search volume but manageable competition.'
            },
            {
                number: 'Step 2',
                title: 'Plan Your Course',
                description: 'Outline your course structure, create learning objectives, and plan your content delivery method (video, text, interactive).',
                tips: 'Start with a smaller course to test the market before creating comprehensive programs.'
            },
            {
                number: 'Step 3',
                title: 'Create Your Content',
                description: 'Develop high-quality course materials including videos, worksheets, and supplementary resources. Focus on actionable, practical content.',
                tips: 'Invest in good recording equipment for professional-quality videos.'
            },
            {
                number: 'Step 4',
                title: 'Choose Your Platform',
                description: 'Select a course hosting platform: Udemy, Teachable, Thinkific, or your own website. Consider pricing and commission structures.',
                tips: 'Start with established platforms to reach existing audiences.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Promote',
                description: 'Launch your course with a marketing strategy including email lists, social media, and partnerships. Gather feedback and continuously improve.',
                tips: 'Offer a free preview or bonus content to attract students.'
            }
        ]
    },
    'SaaS Product Development': {
        budget: '$950',
        steps: [
            {
                number: 'Step 1',
                title: 'Problem Identification',
                description: 'Identify a specific business problem that needs solving. Research your target market and validate that people will pay for your solution.',
                tips: 'Focus on problems you personally understand or have experienced.'
            },
            {
                number: 'Step 2',
                title: 'Choose Your Tech Stack',
                description: 'Select appropriate technologies: no-code platforms (Bubble, Webflow), low-code tools, or custom development based on your skills and budget.',
                tips: 'Start with no-code platforms to validate your idea quickly.'
            },
            {
                number: 'Step 3',
                title: 'Design & Prototype',
                description: 'Create wireframes and user flows. Build a minimum viable product (MVP) with core features to test with early users.',
                tips: 'Focus on solving one problem really well rather than many problems poorly.'
            },
            {
                number: 'Step 4',
                title: 'Development & Testing',
                description: 'Build your SaaS product, implement user authentication, payment processing, and core functionality. Test thoroughly with beta users.',
                tips: 'Use tools like Stripe for payments and Auth0 for authentication.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Scale',
                description: 'Launch your SaaS with a pricing strategy, marketing plan, and customer support system. Focus on user acquisition and retention.',
                tips: 'Offer a free tier to attract users and premium features for monetization.'
            }
        ]
    },
    'Franchise Investment': {
        budget: '$900',
        steps: [
            {
                number: 'Step 1',
                title: 'Research Franchise Options',
                description: 'Research different franchise opportunities in food service, retail, or services. Consider factors like initial investment, ongoing fees, and support.',
                tips: 'Focus on franchises with proven track records and strong brand recognition.'
            },
            {
                number: 'Step 2',
                title: 'Financial Planning',
                description: 'Assess your financial situation, create a business plan, and secure funding if needed. Understand all costs including initial investment and ongoing expenses.',
                tips: 'Have at least 6 months of operating expenses saved before starting.'
            },
            {
                number: 'Step 3',
                title: 'Location & Setup',
                description: 'Choose a strategic location with good foot traffic and accessibility. Handle all legal requirements, permits, and business registration.',
                tips: 'Location is crucial for retail and food service franchises.'
            },
            {
                number: 'Step 4',
                title: 'Training & Launch',
                description: 'Complete franchise training, hire and train staff, and prepare for opening. Follow the franchisor\'s proven systems and procedures.',
                tips: 'Don\'t deviate from the franchise system - it\'s proven to work.'
            },
            {
                number: 'Step 5',
                title: 'Operations & Growth',
                description: 'Implement marketing strategies, manage daily operations, and focus on customer service. Consider expanding to multiple locations.',
                tips: 'Focus on operational excellence and customer satisfaction for long-term success.'
            }
        ]
    },
    'Real Estate Investment': {
        budget: '$980',
        steps: [
            {
                number: 'Step 1',
                title: 'Education & Research',
                description: 'Learn about different real estate investment strategies: REITs, crowdfunding, rental properties, or flipping. Understand market trends and risks.',
                tips: 'Start with REITs or crowdfunding for lower risk and easier entry.'
            },
            {
                number: 'Step 2',
                title: 'Choose Investment Strategy',
                description: 'Decide on your investment approach based on your goals, risk tolerance, and available capital. Research specific opportunities in your target market.',
                tips: 'Diversify your investments across different property types and locations.'
            },
            {
                number: 'Step 3',
                title: 'Financial Preparation',
                description: 'Assess your financial situation, improve your credit score, and save for down payments. Understand all costs including taxes and maintenance.',
                tips: 'Have emergency funds and maintain good credit for better financing options.'
            },
            {
                number: 'Step 4',
                title: 'Property Selection',
                description: 'Research potential properties, analyze cash flow, and conduct thorough due diligence. Consider location, property condition, and market potential.',
                tips: 'Focus on properties in growing areas with good rental demand.'
            },
            {
                number: 'Step 5',
                title: 'Acquisition & Management',
                description: 'Complete the purchase process, set up property management systems, and implement your investment strategy. Monitor performance and adjust as needed.',
                tips: 'Consider hiring a property manager if you lack time or experience.'
            }
        ]
    },
    'Content Writing Services': {
        budget: '$75',
        steps: [
            {
                number: 'Step 1',
                title: 'Define Your Niche',
                description: 'Choose a specific writing niche: blog posts, website content, marketing copy, technical writing, or creative content. Research market demand and competition.',
                tips: 'Specialize in a specific industry or content type to stand out.'
            },
            {
                number: 'Step 2',
                title: 'Build Your Portfolio',
                description: 'Create sample pieces in your chosen niche. Start a blog, contribute guest posts, or create mock projects to showcase your writing skills.',
                tips: 'Quality samples are more important than quantity.'
            },
            {
                number: 'Step 3',
                title: 'Set Up Your Business',
                description: 'Create a professional website, set up business accounts, and establish your pricing structure. Consider different service packages.',
                tips: 'Start with competitive pricing to build your client base.'
            },
            {
                number: 'Step 4',
                title: 'Find Your First Clients',
                description: 'Use freelance platforms like Upwork, Fiverr, or ProBlogger. Network with local businesses and leverage social media to find opportunities.',
                tips: 'Offer a free sample or discounted first project to attract clients.'
            },
            {
                number: 'Step 5',
                title: 'Deliver & Scale',
                description: 'Provide excellent service, gather testimonials, and use results to attract larger clients. Consider specializing further or hiring subcontractors.',
                tips: 'Focus on building long-term relationships with clients.'
            }
        ]
    },
    'Virtual Assistant': {
        budget: '$90',
        steps: [
            {
                number: 'Step 1',
                title: 'Define Your Services',
                description: 'Choose your service offerings: email management, scheduling, data entry, social media management, or administrative tasks. Identify your target market.',
                tips: 'Start with services you\'re confident you can deliver excellently.'
            },
            {
                number: 'Step 2',
                title: 'Set Up Your Workspace',
                description: 'Create a professional home office with reliable internet, necessary software, and tools. Invest in productivity and communication tools.',
                tips: 'A quiet, professional workspace is essential for client calls.'
            },
            {
                number: 'Step 3',
                title: 'Create Your Brand',
                description: 'Develop a professional website, business cards, and social media presence. Establish your pricing structure and service packages.',
                tips: 'Position yourself as a professional, not just a freelancer.'
            },
            {
                number: 'Step 4',
                title: 'Find Your First Clients',
                description: 'Use platforms like Upwork, Fiverr, or specialized VA directories. Network with entrepreneurs and small business owners.',
                tips: 'Offer a free consultation or trial period to attract initial clients.'
            },
            {
                number: 'Step 5',
                title: 'Deliver & Expand',
                description: 'Provide exceptional service, gather testimonials, and use results to attract larger clients. Consider specializing in specific industries.',
                tips: 'Focus on building trust and reliability with your clients.'
            }
        ]
    },
    'Graphic Design Services': {
        budget: '$85',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Specialization',
                description: 'Decide on your design focus: logos, social media graphics, marketing materials, or web design. Research market demand and competition.',
                tips: 'Specializing helps you stand out and command higher rates.'
            },
            {
                number: 'Step 2',
                title: 'Build Your Portfolio',
                description: 'Create sample designs in your chosen niche. Use mock projects, redesign existing brands, or offer free work to build your portfolio.',
                tips: 'Quality over quantity - showcase your best work only.'
            },
            {
                number: 'Step 3',
                title: 'Set Up Your Business',
                description: 'Create a professional website showcasing your work, set up business accounts, and establish your pricing structure.',
                tips: 'Invest in professional tools and software for better results.'
            },
            {
                number: 'Step 4',
                title: 'Find Your First Clients',
                description: 'Use platforms like 99designs, Behance, or freelance sites. Network with local businesses and leverage social media.',
                tips: 'Offer a free consultation or sample design to attract clients.'
            },
            {
                number: 'Step 5',
                title: 'Deliver & Grow',
                description: 'Provide excellent designs, gather testimonials, and use results to attract larger clients. Consider specializing in specific industries.',
                tips: 'Focus on understanding client needs and delivering solutions.'
            }
        ]
    },
    'Print-on-Demand Business': {
        budget: '$300',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Niche',
                description: 'Select a specific market: funny t-shirts, motivational quotes, niche hobbies, or trending topics. Research what\'s selling well.',
                tips: 'Focus on niches with passionate communities and repeat buyers.'
            },
            {
                number: 'Step 2',
                title: 'Design Your Products',
                description: 'Create unique designs using tools like Canva, Photoshop, or hire designers. Focus on quality and originality in your designs.',
                tips: 'Start with a small collection and expand based on sales data.'
            },
            {
                number: 'Step 3',
                title: 'Choose Your Platform',
                description: 'Select POD platforms: Printful, Printify, or direct integration with Shopify. Consider fees, quality, and shipping options.',
                tips: 'Test different platforms to find the best quality and pricing.'
            },
            {
                number: 'Step 4',
                title: 'Set Up Your Store',
                description: 'Create your online store using Shopify, Etsy, or your own website. Optimize product listings and descriptions.',
                tips: 'High-quality product photos and descriptions are crucial for sales.'
            },
            {
                number: 'Step 5',
                title: 'Market & Scale',
                description: 'Implement marketing strategies including social media, influencer partnerships, and paid advertising. Analyze data and optimize.',
                tips: 'Focus on building a brand, not just selling individual products.'
            }
        ]
    },
    'Web Development Services': {
        budget: '$400',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Specialization',
                description: 'Decide on your focus: WordPress development, custom websites, e-commerce, or specific frameworks. Research market demand.',
                tips: 'Specializing helps you become more efficient and command higher rates.'
            },
            {
                number: 'Step 2',
                title: 'Build Your Portfolio',
                description: 'Create sample websites, contribute to open source, or build projects for friends/family. Showcase your best work.',
                tips: 'Include a variety of projects to demonstrate your range.'
            },
            {
                number: 'Step 3',
                title: 'Set Up Your Business',
                description: 'Create a professional website, set up business accounts, and establish your pricing structure. Consider different service packages.',
                tips: 'Invest in reliable hosting and development tools.'
            },
            {
                number: 'Step 4',
                title: 'Find Your First Clients',
                description: 'Use platforms like Upwork, Freelancer, or network with local businesses. Offer competitive pricing to build your portfolio.',
                tips: 'Start with smaller projects to build your reputation.'
            },
            {
                number: 'Step 5',
                title: 'Deliver & Scale',
                description: 'Provide excellent service, gather testimonials, and use results to attract larger clients. Consider specializing in specific industries.',
                tips: 'Focus on building long-term relationships with clients.'
            }
        ]
    },
    'Digital Marketing Agency': {
        budget: '$500',
        steps: [
            {
                number: 'Step 1',
                title: 'Define Your Services',
                description: 'Choose your service offerings: SEO, social media marketing, PPC, email marketing, or content marketing. Identify your target market.',
                tips: 'Start with services you have experience in or can learn quickly.'
            },
            {
                number: 'Step 2',
                title: 'Build Your Portfolio',
                description: 'Create case studies, run campaigns for friends/family, or offer free work to build your portfolio. Document your results.',
                tips: 'Focus on measurable results and ROI for your clients.'
            },
            {
                number: 'Step 3',
                title: 'Set Up Your Business',
                description: 'Create a professional website, set up business accounts, and establish your pricing structure. Invest in marketing tools.',
                tips: 'Position yourself as a results-driven agency, not just a freelancer.'
            },
            {
                number: 'Step 4',
                title: 'Find Your First Clients',
                description: 'Network with local businesses, use freelance platforms, or leverage your personal network. Offer free audits or consultations.',
                tips: 'Focus on small businesses that need marketing but can\'t afford large agencies.'
            },
            {
                number: 'Step 5',
                title: 'Deliver & Scale',
                description: 'Provide excellent results, gather testimonials, and use case studies to attract larger clients. Consider hiring team members.',
                tips: 'Focus on building long-term relationships and recurring revenue.'
            }
        ]
    },
    'E-commerce Brand Building': {
        budget: '$600',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Niche',
                description: 'Select a specific product category with passionate customers. Research market demand, competition, and profit margins.',
                tips: 'Focus on niches with repeat buyers and high customer lifetime value.'
            },
            {
                number: 'Step 2',
                title: 'Develop Your Brand',
                description: 'Create a unique brand identity, story, and positioning. Design your logo, packaging, and brand guidelines.',
                tips: 'Your brand should resonate with your target audience emotionally.'
            },
            {
                number: 'Step 3',
                title: 'Choose Your Platform',
                description: 'Select e-commerce platforms: Shopify, WooCommerce, or custom solutions. Consider your budget and technical requirements.',
                tips: 'Start with Shopify for ease of use and quick setup.'
            },
            {
                number: 'Step 4',
                title: 'Product Development',
                description: 'Source or create your products, develop packaging, and establish quality control. Focus on creating unique value.',
                tips: 'Quality and customer experience are more important than price.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Market',
                description: 'Launch your brand with a comprehensive marketing strategy including social media, influencer partnerships, and paid advertising.',
                tips: 'Focus on building a community around your brand, not just selling products.'
            }
        ]
    },
    'AI-Powered Business Tools': {
        budget: '$800',
        steps: [
            {
                number: 'Step 1',
                title: 'Identify Market Need',
                description: 'Research specific business problems that can be solved with AI. Focus on repetitive tasks, data analysis, or process automation.',
                tips: 'Start with problems you personally understand or have experienced.'
            },
            {
                number: 'Step 2',
                title: 'Choose Your Tech Stack',
                description: 'Select appropriate AI technologies: no-code platforms, APIs, or custom development. Consider your technical skills and budget.',
                tips: 'Start with existing AI APIs to validate your idea quickly.'
            },
            {
                number: 'Step 3',
                title: 'Design & Prototype',
                description: 'Create wireframes and user flows. Build a minimum viable product (MVP) with core AI functionality to test with users.',
                tips: 'Focus on solving one problem really well rather than many problems poorly.'
            },
            {
                number: 'Step 4',
                title: 'Development & Testing',
                description: 'Build your AI tool, implement user authentication, and integrate AI APIs. Test thoroughly with target users.',
                tips: 'Use tools like OpenAI API, Google Cloud AI, or Azure AI for development.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Scale',
                description: 'Launch your AI tool with a pricing strategy and marketing plan. Focus on user acquisition and continuous improvement.',
                tips: 'Offer a free tier to attract users and premium features for monetization.'
            }
        ]
    },
    'Subscription Box Service': {
        budget: '$700',
        steps: [
            {
                number: 'Step 1',
                title: 'Choose Your Niche',
                description: 'Select a specific market with passionate customers: beauty, fitness, food, hobbies, or lifestyle. Research existing boxes and gaps.',
                tips: 'Focus on niches with repeat buyers and high customer lifetime value.'
            },
            {
                number: 'Step 2',
                title: 'Plan Your Box',
                description: 'Design your box contents, sourcing strategy, and packaging. Focus on creating unique value and memorable unboxing experiences.',
                tips: 'Quality and curation are more important than quantity.'
            },
            {
                number: 'Step 3',
                title: 'Source Your Products',
                description: 'Find reliable suppliers for your box contents. Consider both domestic and international suppliers for variety and cost-effectiveness.',
                tips: 'Start with smaller quantities to test products and suppliers.'
            },
            {
                number: 'Step 4',
                title: 'Set Up Your Business',
                description: 'Create your website, set up subscription management, and establish your pricing structure. Consider different subscription tiers.',
                tips: 'Use platforms like Shopify or Cratejoy for subscription management.'
            },
            {
                number: 'Step 5',
                title: 'Launch & Market',
                description: 'Launch your subscription box with a comprehensive marketing strategy including social media, influencer partnerships, and email marketing.',
                tips: 'Focus on building a community around your brand and creating anticipation for each box.'
            }
        ]
    }
};

// Show modal with idea details
function showIdeaModal(ideaTitle) {
    const plan = ideaPlans[ideaTitle];
    if (plan) {
        modalTitle.textContent = ideaTitle;
        modalBudget.textContent = plan.budget;
        
        modalSteps.innerHTML = '';
        plan.steps.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step';
            stepElement.innerHTML = `
                <div class="step-number">${step.number}</div>
                <div class="step-title">${step.title}</div>
                <div class="step-description">${step.description}</div>
                <div class="step-tips">💡 ${step.tips}</div>
            `;
            modalSteps.appendChild(stepElement);
        });
        
        modal.style.display = 'block';
    }
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Event listeners
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Add click listeners to idea cards
document.addEventListener('DOMContentLoaded', function() {
    const ideaCards = document.querySelectorAll('.idea-card');
    ideaCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showIdeaModal(title);
        });
    });
});

// Comments functionality
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.querySelector('.comments-list');
    
    // Available avatar images
    const avatarImages = [
        'img/avatar/1.png',
        'img/avatar/2.jpg',
        'img/avatar/3.jpg',
        'img/avatar/4.png',
        'img/avatar/5.jpg',
        'img/avatar/6.jpg',
        'img/avatar/7.jpg'
    ];
    
    // Function to get random avatar
    function getRandomAvatar() {
        return avatarImages[Math.floor(Math.random() * avatarImages.length)];
    }
    
    // Function to format date
    function formatDate(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    }
    
    // Function to create comment HTML
    function createCommentHTML(comment) {
        return `
            <div class="comment-item">
                <div class="comment-avatar">
                    <img src="${comment.avatar}" alt="User Avatar">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${comment.name}</h4>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p>"${comment.text}"</p>
                    <div class="comment-tags">
                        ${comment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Handle form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('commentName').value.trim();
        const budget = document.getElementById('commentBudget').value.trim();
        const text = document.getElementById('commentText').value.trim();
        const tagsInput = document.getElementById('commentTags').value.trim();
        
        // Validation
        if (!name || !budget || !text) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Parse tags
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        
        // Create new comment object
        const newComment = {
            name: name,
            budget: parseInt(budget),
            text: text,
            tags: tags,
            avatar: getRandomAvatar(),
            date: formatDate(new Date())
        };
        
        // Create comment HTML
        const commentHTML = createCommentHTML(newComment);
        
        // Add to the beginning of comments list
        commentsList.insertAdjacentHTML('afterbegin', commentHTML);
        
        // Reset form
        commentForm.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        `;
        successMessage.textContent = 'Comment added successfully!';
        document.body.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 3000);
        
        // Scroll to new comment
        const newCommentElement = commentsList.firstElementChild;
        newCommentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // Add CSS animations for success message
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 