/**
 * LabelLens Promotional Landing Page Logic
 * Interactive Product Simulator, INS Decoder, FAQ, and Dynamic Badges
 */

// 1. Simulated Product Database (Accurate real Indian packaged foods data)
const SIMULATED_PRODUCTS = {
  maggi: {
    name: "Maggi 2-Minute Noodles",
    category: "Instant Noodles (RTE)",
    icon: "🍜",
    barcode: "8901058863116",
    status: "red",
    headline: "HIGH SODIUM & PALM OIL ALERT",
    basis: "per 100g",
    calories: "427 kcal",
    sugar: "1.8g (~0.4 tsp)",
    sodium: "820 mg (41% ICMR limit)",
    satFat: "6.8g",
    palmOil: true,
    palmOilText: "⚠️ Refined Palm Oil Detected in Noodle Cake",
    hiddenSugars: ["Hydrolyzed Groundnut Protein", "Wheat Gluten"],
    additives: [
      { code: "INS 635", name: "Disodium 5'-ribonucleotides", category: "Flavor Enhancer", note: "Synergistic MSG-like enhancer" },
      { code: "INS 508", name: "Potassium Chloride", category: "Mineral Salt", note: "Salt substitute" }
    ],
    profileTriggers: {
      hypertension: "High sodium (820mg/100g) breaches your <400mg target.",
      palmOil: "Contains refined palm oil in noodle formulation."
    }
  },
  parleg: {
    name: "Parle-G Glucose Biscuits",
    category: "Biscuits & Bakery",
    icon: "🍪",
    barcode: "8901719101038",
    status: "red",
    headline: "HIGH ADDED SUGAR & INVERT SYRUP ALERT",
    basis: "per 100g",
    calories: "454 kcal",
    sugar: "26.5g (~6.6 tsp sugar)",
    sodium: "280 mg (14% ICMR limit)",
    satFat: "6.2g",
    palmOil: true,
    palmOilText: "⚠️ Refined Palm Oil Detected",
    hiddenSugars: ["Invert Sugar Syrup", "Liquid Glucose"],
    additives: [
      { code: "INS 503(ii)", name: "Ammonium Hydrogen Carbonate", category: "Raising Agent", note: "Baking leavening agent" },
      { code: "INS 500(ii)", name: "Sodium Hydrogen Carbonate", category: "Acidity Regulator", note: "Baking soda" }
    ],
    profileTriggers: {
      diabetic: "Extreme sugar (26.5g/100g) & Invert Syrup causes acute glycemic spikes.",
      palmOil: "Contains palm oil."
    }
  },
  bhujia: {
    name: "Haldiram's Aloo Bhujia",
    category: "Namkeen Snacks",
    icon: "🥔",
    barcode: "8904004400465",
    status: "red",
    headline: "HIGH HFSS & SATURATED FAT ALERT",
    basis: "per 100g",
    calories: "582 kcal",
    sugar: "2.4g (~0.6 tsp)",
    sodium: "690 mg (34% ICMR limit)",
    satFat: "14.2g (Exceeds 8g limit)",
    palmOil: true,
    palmOilText: "⚠️ Deep Fried in Refined Palmolein",
    hiddenSugars: [],
    additives: [
      { code: "INS 330", name: "Citric Acid", category: "Acidity Regulator", note: "Tangy flavor agent" }
    ],
    profileTriggers: {
      hypertension: "Sodium 690mg exceeds namkeen safe threshold.",
      palmOil: "Fried in refined palmolein oil."
    }
  },
  cola: {
    name: "Popular Cold Beverage",
    category: "Sweetened Carbonated Beverage",
    icon: "🥤",
    barcode: "8901764012211",
    status: "red",
    headline: "LIQUID SUGAR & SYNTHETIC CARAMEL ALERT",
    basis: "per 100ml",
    calories: "44 kcal",
    sugar: "10.6g (~2.6 tsp per 100ml)",
    sodium: "12 mg (1% ICMR limit)",
    satFat: "0g",
    palmOil: false,
    palmOilText: "✅ Palm Oil Free (Liquid formulation)",
    hiddenSugars: ["Liquid Sugar", "Fructose"],
    additives: [
      { code: "INS 150d", name: "Caramel IV (Sulphite Ammonia)", category: "Synthetic Color", note: "Common dark soda colorant" },
      { code: "INS 338", name: "Orthophosphoric Acid", category: "Acidity Regulator", note: "Tart preservative" }
    ],
    profileTriggers: {
      diabetic: "Liquid sugar (10.6g/100ml) breaches 5g liquid limit and hits bloodstream instantly."
    }
  },
  oats: {
    name: "100% Whole Rolled Oats",
    category: "Breakfast Cereals & Grains",
    icon: "🥣",
    barcode: "8906001021481",
    status: "green",
    headline: "BALANCED HEALTH CHOICE (CLEAN LABEL)",
    basis: "per 100g",
    calories: "389 kcal",
    sugar: "0.8g (Naturally occurring, 0 tsp added)",
    sodium: "4 mg (0.2% ICMR limit)",
    satFat: "1.3g (Low)",
    palmOil: false,
    palmOilText: "✅ 100% Palm Oil Free & Single Ingredient",
    hiddenSugars: [],
    additives: [],
    profileTriggers: {}
  }
};

// 2. INS Additives Catalog
const INS_DATABASE = {
  "INS 621": {
    name: "Monosodium Glutamate (MSG)",
    category: "Flavor Enhancer",
    risk: "Medium",
    riskClass: "verdict-amber",
    commonFoods: "Instant noodles, potato chips, savory seasonings, soups",
    description: "Concentrated umami flavor enhancer. Often masked on packaging under terms like 'yeast extract' or 'hydrolyzed vegetable protein'."
  },
  "INS 102": {
    name: "Tartrazine (Synthetic Yellow 5)",
    category: "Synthetic Food Dye",
    risk: "High",
    riskClass: "verdict-red",
    commonFoods: "Custard powder, soft drinks, candies, spicy extruded snacks",
    description: "A coal-tar derived yellow dye. European regulations mandate warnings linking it to attention deficit and hyperactivity in children."
  },
  "INS 110": {
    name: "Sunset Yellow FCF",
    category: "Synthetic Food Dye",
    risk: "High",
    riskClass: "verdict-red",
    commonFoods: "Orange drinks, biscuit creams, candy, packaged sweets",
    description: "Petroleum-derived orange coloring. Frequently flagged by health regulators for allergic sensitivities and hyperactivity."
  },
  "INS 150d": {
    name: "Caramel IV (Sulphite Ammonia)",
    category: "Synthetic Food Color",
    risk: "Moderate",
    riskClass: "verdict-amber",
    commonFoods: "Colas, dark sauces, bakery glazes, chocolate mixes",
    description: "Produced by heating carbohydrates with ammonium and sulphite compounds. Imparts a rich dark brown color to sodas and gravies."
  },
  "INS 951": {
    name: "Aspartame",
    category: "Artificial Sweetener",
    risk: "High",
    riskClass: "verdict-red",
    commonFoods: "Diet sodas, sugar-free chewing gums, low-calorie yogurts",
    description: "Intense non-nutritive artificial sweetener 200x sweeter than sugar. Contains phenylalanine; not safe for people with PKU."
  },
  "INS 955": {
    name: "Sucralose",
    category: "Artificial Sweetener",
    risk: "Moderate",
    riskClass: "verdict-amber",
    commonFoods: "Sugar-free biscuits, protein powders, diet beverages",
    description: "Chlorinated sucrose molecule that is 600x sweeter than sugar. May affect gut microbiome balance at high consumption."
  },
  "INS 211": {
    name: "Sodium Benzoate",
    category: "Chemical Preservative",
    risk: "Moderate",
    riskClass: "verdict-amber",
    commonFoods: "Ketchup, fruit jams, carbonated drinks, pickles",
    description: "Anti-fungal preservative. When combined with Vitamin C (Ascorbic acid) under heat and light, it can form traces of benzene."
  },
  "Maltodextrin": {
    name: "Maltodextrin (Hidden Sugar)",
    category: "Glycemic Bulking Agent",
    risk: "High",
    riskClass: "verdict-red",
    commonFoods: "Health drinks, protein powders, snack powders, sauces",
    description: "Starch derivative with a glycemic index of 105-135—higher than table sugar! Spikes insulin immediately while being declared as carbohydrate rather than sugar."
  },
  "Palmolein": {
    name: "Refined Palmolein Oil",
    category: "Refined Industrial Fat",
    risk: "High",
    riskClass: "verdict-red",
    commonFoods: "80%+ of Indian biscuits, namkeen, fried chips, and instant noodles",
    description: "Cheap vegetable oil high in palmitic acid and saturated fats. Widely preferred by industrial manufacturers for low cost and long shelf life."
  }
};

// State Variables
let currentProductKey = "maggi";
let activeDietaryProfile = {
  diabetic: true,
  hypertension: false,
  palmOil: true,
  pureVeg: true
};

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initProductSimulator();
  initDietaryProfileSwitches();
  initInsDecoder();
  initFaqAccordion();
  initFloatingDownloadBar();
  initMobileNav();
  renderSimulator();
});

// 1. Initialize Simulator
function initProductSimulator() {
  const buttons = document.querySelectorAll(".sim-product-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentProductKey = btn.getAttribute("data-prod");
      renderSimulator();
    });
  });
}

// 2. Initialize Dietary Switches
function initDietaryProfileSwitches() {
  const toggleBtns = document.querySelectorAll(".sim-toggle-btn");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-profile");
      activeDietaryProfile[type] = !activeDietaryProfile[type];
      btn.classList.toggle("active", activeDietaryProfile[type]);
      
      const checkSpan = btn.querySelector(".sim-toggle-check");
      if (checkSpan) {
        checkSpan.textContent = activeDietaryProfile[type] ? "✓" : "";
      }
      renderSimulator();
    });
  });
}

// 3. Render Phone Screen Based on Current Product & Profile
function renderSimulator() {
  const prod = SIMULATED_PRODUCTS[currentProductKey];
  if (!prod) return;

  // Banner
  const bannerEl = document.getElementById("simReportBanner");
  const bannerTextEl = document.getElementById("simBannerText");
  if (bannerEl && bannerTextEl) {
    bannerEl.className = `sim-report-banner status-${prod.status}`;
    bannerTextEl.textContent = prod.headline;
  }

  // Titles
  const nameEl = document.getElementById("simProdName");
  const catEl = document.getElementById("simProdCat");
  if (nameEl) nameEl.textContent = prod.name;
  if (catEl) catEl.textContent = `${prod.category} • ${prod.basis}`;

  // Metrics
  const sugarEl = document.getElementById("simValSugar");
  const sodiumEl = document.getElementById("simValSodium");
  const calsEl = document.getElementById("simValCals");
  const fatEl = document.getElementById("simValSatFat");

  if (sugarEl) sugarEl.textContent = prod.sugar;
  if (sodiumEl) sodiumEl.textContent = prod.sodium;
  if (calsEl) calsEl.textContent = prod.calories;
  if (fatEl) fatEl.textContent = prod.satFat;

  // Palm oil
  const palmEl = document.getElementById("simPalmOilRow");
  if (palmEl) {
    if (prod.palmOil) {
      palmEl.className = "sim-palmoil-row sim-palmoil-alert";
      palmEl.textContent = prod.palmOilText;
    } else {
      palmEl.className = "sim-palmoil-row sim-palmoil-clean";
      palmEl.textContent = prod.palmOilText;
    }
  }

  // Profile Matching Logic
  const profileMatchEl = document.getElementById("simProfileMatchCard");
  if (profileMatchEl) {
    const alerts = [];

    if (activeDietaryProfile.diabetic && prod.profileTriggers.diabetic) {
      alerts.push(`🩸 Diabetic Alert: ${prod.profileTriggers.diabetic}`);
    }
    if (activeDietaryProfile.hypertension && prod.profileTriggers.hypertension) {
      alerts.push(`🧂 Blood Pressure Alert: ${prod.profileTriggers.hypertension}`);
    }
    if (activeDietaryProfile.palmOil && prod.profileTriggers.palmOil) {
      alerts.push(`🌴 Palm Oil Alert: ${prod.profileTriggers.palmOil}`);
    }

    if (alerts.length > 0) {
      profileMatchEl.className = "sim-profile-match-card match-danger";
      profileMatchEl.innerHTML = `<span>⚠️</span><div>${alerts.join("<br>")}</div>`;
    } else {
      profileMatchEl.className = "sim-profile-match-card match-pass";
      profileMatchEl.innerHTML = `<span>🛡️</span><div>Clean match for your active dietary profile!</div>`;
    }
  }
}

// 4. INS Decoder Logic
function initInsDecoder() {
  const pills = document.querySelectorAll(".ins-filter-pill");
  const codeBadge = document.getElementById("insCodeBadge");
  const catTag = document.getElementById("insCategoryTag");
  const descEl = document.getElementById("insDesc");
  const foodsEl = document.getElementById("insFoods");
  const riskEl = document.getElementById("insRisk");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const key = pill.getAttribute("data-ins");
      const data = INS_DATABASE[key];

      if (data && codeBadge && catTag && descEl && foodsEl && riskEl) {
        codeBadge.textContent = `${key} - ${data.name}`;
        catTag.textContent = data.category;
        descEl.textContent = data.description;
        foodsEl.textContent = data.commonFoods;
        riskEl.textContent = `${data.risk} Concern`;
        riskEl.className = `meta-val ${data.riskClass}`;
      }
    });
  });
}

// 5. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

// 6. Floating Download CTA on Scroll
function initFloatingDownloadBar() {
  const bar = document.getElementById("floatingDownloadBar");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      bar.classList.add("visible");
    } else {
      bar.classList.remove("visible");
    }
  });
}

// 7. Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileToggleBtn");
  const navLinks = document.getElementById("navLinks");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });
  }
}
