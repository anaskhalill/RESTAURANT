/* Di Napoli — carte localisée (FR / EN / IT / AR) */
const L = (fr, en, it, ar) => ({ fr, en, it, ar });

const MENU_ORDER = ["pizzas", "ciabattas", "burgers", "baguettes", "snacks", "drinks"];

const PIZZA_SIZES = {
  fr: ["1/4 · 2 pers.", "1/2 · 4 pers.", "Plateau · 8 pers."],
  en: ["1/4 · 2 people", "1/2 · 4 people", "Party tray · 8 people"],
  it: ["1/4 · 2 pers.", "1/2 · 4 pers.", "Teglia · 8 pers."],
  ar: ["ربع · شخصان", "نصف · 4 أشخاص", "صينية · 8 أشخاص"]
};

const MENU = {
  pizzas: {
    label: L("Pizzas", "Pizzas", "Pizze", "بيتزا"),
    items: [
      {
        name: L("Fruits de mer", "Seafood", "Frutti di mare", "مأكولات بحرية"),
        desc: L("Sauce tomate, fruits de mer, fromage", "Tomato sauce, seafood, cheese", "Salsa di pomodoro, frutti di mare, formaggio", "صلصة طماطم، مأكولات بحرية، جبن"),
        prices: ["29,900", "58,900", "119,900"]
      },
      {
        name: L("Crevettes", "Shrimp", "Gamberi", "قريدس"),
        desc: L("Sauce tomate, fromage, crevettes", "Tomato sauce, cheese, shrimp", "Salsa di pomodoro, formaggio, gamberi", "صلصة طماطم، جبن، قريدس"),
        prices: ["26,900", "53,900", "107,500"]
      },
      {
        name: L("Poulet", "Chicken", "Pollo", "دجاج"),
        desc: L("Sauce tomate, fromage, poulet", "Tomato sauce, cheese, chicken", "Salsa di pomodoro, formaggio, pollo", "صلصة طماطم، جبن، دجاج"),
        prices: ["21,900", "43,900", "86,900"]
      },
      {
        name: L("4 fromages", "4 cheeses", "4 formaggi", "4 أجبان"),
        desc: L("Mozzarella, gruyère, ricotta, gouda", "Mozzarella, gruyère, ricotta, gouda", "Mozzarella, groviera, ricotta, gouda", "موزاريلا، غرويير، ريكوتا، غودا"),
        prices: ["21,900", "43,500", "87,500"]
      },
      {
        name: L("Thon", "Tuna", "Tonno", "تونة"),
        desc: L("Sauce tomate, thon, fromage, persil", "Tomato sauce, tuna, cheese, parsley", "Salsa di pomodoro, tonno, formaggio, prezzemolo", "صلصة طماطم، تونة، جبن، بقدونس"),
        prices: ["19,900", "39,900", "78,500"]
      },
      {
        name: L("Viande hachée", "Minced meat", "Carne macinata", "لحم مفروم"),
        desc: L("Sauce tomate, fromage, viande hachée", "Tomato sauce, cheese, minced meat", "Salsa di pomodoro, formaggio, carne macinata", "صلصة طماطم، جبن، لحم مفروم"),
        prices: ["21,900", "39,900", "82,500"]
      },
      {
        name: L("Pepperoni", "Pepperoni", "Pepperoni", "بيبروني"),
        desc: L("Sauce tomate, fromage, pepperoni", "Tomato sauce, cheese, pepperoni", "Salsa di pomodoro, formaggio, pepperoni", "صلصة طماطم، جبن، بيبروني"),
        prices: ["17,900", "35,900", "71,500"]
      }
    ]
  },

  ciabattas: {
    label: L("Ciabattas", "Ciabattas", "Ciabatte", "تشياباتا"),
    items: [
      {
        name: L("Steak cheese", "Steak cheese", "Steak cheese", "ستيك تشيز"),
        desc: L("Viande hachée, sauce cheddar ou gouda, sauce tartare, sauce aioli, harissa, laitue, tomate, oignon et frites.", "Minced meat, cheddar or gouda sauce, tartar sauce, aioli, harissa, lettuce, tomato, onion and fries.", "Carne macinata, salsa cheddar o gouda, salsa tartara, aioli, harissa, lattuga, pomodoro, cipolla e patatine.", "لحم مفروم، صلصة شيدر أو غودا، صلصة تارتار، أيولي، هريسة، خس، طماطم، بصل وبطاطا مقلية."),
        price: "13,700"
      },
      {
        name: L("Fried Chicken", "Fried Chicken", "Fried Chicken", "فريد تشيكن"),
        desc: L("Poulet crispy, sauce cheddar ou gouda, sauce tartare, sauce aioli, harissa, laitue, tomate, oignon et frites.", "Crispy chicken, cheddar or gouda sauce, tartar sauce, aioli, harissa, lettuce, tomato, onion and fries.", "Pollo croccante, salsa cheddar o gouda, salsa tartara, aioli, harissa, lattuga, pomodoro, cipolla e patatine.", "دجاج مقرمش، صلصة شيدر أو غودا، صلصة تارتار، أيولي، هريسة، خس، طماطم، بصل وبطاطا مقلية."),
        price: "12,400"
      },
      {
        name: L("Spicy", "Spicy", "Spicy", "سبايسي"),
        desc: L("Poulet spicy, sauce cheddar, pesto, sauce aioli, harissa, laitue, tomate, oignon et frites.", "Spicy chicken, cheddar sauce, pesto, aioli, harissa, lettuce, tomato, onion and fries.", "Pollo piccante, salsa cheddar, pesto, aioli, harissa, lattuga, pomodoro, cipolla e patatine.", "دجاج حار، صلصة شيدر، بيستو، أيولي، هريسة، خس، طماطم، بصل وبطاطا مقلية."),
        price: "11,900"
      }
    ]
  },

  burgers: {
    label: L("Burgers", "Burgers", "Burger", "برغر"),
    items: [
      {
        name: L("New York Burger", "New York Burger", "New York Burger", "نيويورك برغر"),
        desc: L("Steak, bacon, fromage, sauce burger, barbecue, oignons caramélisés, laitue, tomate et frites.", "Steak, bacon, cheese, burger sauce, barbecue, caramelised onions, lettuce, tomato and fries.", "Bistecca, bacon, formaggio, salsa burger, barbecue, cipolle caramellate, lattuga, pomodoro e patatine.", "ستيك، بيكون، جبن، صلصة برغر، باربكيو، بصل مكرمل، خس، طماطم وبطاطا مقلية."),
        price: "17,500"
      },
      {
        name: L("California Burger", "California Burger", "California Burger", "كاليفورنيا برغر"),
        desc: L("Steak, œuf, fromage, sauce burger, barbecue, oignons caramélisés, laitue, tomate et frites.", "Steak, egg, cheese, burger sauce, barbecue, caramelised onions, lettuce, tomato and fries.", "Bistecca, uovo, formaggio, salsa burger, barbecue, cipolle caramellate, lattuga, pomodoro e patatine.", "ستيك، بيض، جبن، صلصة برغر، باربكيو، بصل مكرمل، خس، طماطم وبطاطا مقلية."),
        price: "16,500"
      },
      {
        name: L("Cheesy Burger", "Cheesy Burger", "Cheesy Burger", "تشيزي برغر"),
        desc: L("Steak, fromage, sauce burger, barbecue, oignons caramélisés, laitue, tomate.", "Steak, cheese, burger sauce, barbecue, caramelised onions, lettuce, tomato.", "Bistecca, formaggio, salsa burger, barbecue, cipolle caramellate, lattuga, pomodoro.", "ستيك، جبن، صلصة برغر، باربكيو، بصل مكرمل، خس، طماطم."),
        price: "14,900"
      },
      {
        name: L("Grill Chicken Cheesy Burger", "Grill Chicken Cheesy Burger", "Grill Chicken Cheesy Burger", "غريل تشيكن تشيزي برغر"),
        desc: L("Poulet grillé, fromage, sauce aioli, ketchup, laitue, oignons caramélisés, tomate et frites.", "Grilled chicken, cheese, aioli, ketchup, lettuce, caramelised onions, tomato and fries.", "Pollo grigliato, formaggio, aioli, ketchup, lattuga, cipolle caramellate, pomodoro e patatine.", "دجاج مشوي، جبن، أيولي، كاتشب، خس، بصل مكرمل، طماطم وبطاطا مقلية."),
        price: "12,900"
      }
    ]
  },

  baguettes: {
    label: L("Baguettes", "Baguettes", "Baguette", "باغيت"),
    items: [
      {
        name: L("Baguette française crevettes panées", "French baguette with breaded shrimp", "Baguette francese con gamberi panati", "باغيت فرنسي بالقريدس المقرمش"),
        desc: L("Crevettes panées, sauce tartare, sauce moutarde, pesto, harissa, laitue, tomate et frites.", "Breaded shrimp, tartar sauce, mustard sauce, pesto, harissa, lettuce, tomato and fries.", "Gamberi panati, salsa tartara, salsa alla senape, pesto, harissa, lattuga, pomodoro e patatine.", "قريدس مقرمش، صلصة تارتار، صلصة خردل، بيستو، هريسة، خس، طماطم وبطاطا مقلية."),
        price: "14,900"
      },
      {
        name: L("Baguette française oriental kebab", "French baguette with oriental kebab", "Baguette francese con kebab orientale", "باغيت فرنسي بكباب شرقي"),
        desc: L("Kebab, sauce aioli, harissa, laitue, tomate et frites.", "Kebab, aioli, harissa, lettuce, tomato and fries.", "Kebab, aioli, harissa, lattuga, pomodoro e patatine.", "كباب، أيولي، هريسة، خس، طماطم وبطاطا مقلية."),
        price: "13,800"
      },
      {
        name: L("Baguette française traditionnel", "Traditional French baguette", "Baguette francese tradizionale", "باغيت فرنسي تقليدي"),
        desc: L("Merguez, œuf, sauce aioli, courgette, tomate, harissa, poivrons, persil, oignon et frites.", "Merguez, egg, aioli, courgette, tomato, harissa, peppers, parsley, onion and fries.", "Merguez, uovo, aioli, zucchine, pomodoro, harissa, peperoni, prezzemolo, cipolla e patatine.", "مرقاز، بيض، أيولي، كوسا، طماطم، هريسة، فلفل، بقدونس، بصل وبطاطا مقلية."),
        price: "12,500"
      },
      {
        name: L("Baguette française chich taouk", "French baguette with chich taouk", "Baguette francese con chich taouk", "باغيت فرنسي بشيش طاووق"),
        desc: L("Chich taouk, sauce aioli, harissa, persil, laitue, tomate, oignons et frites.", "Chich taouk, aioli, harissa, parsley, lettuce, tomato, onions and fries.", "Chich taouk, aioli, harissa, prezzemolo, lattuga, pomodoro, cipolla e patatine.", "شيش طاووق، أيولي، هريسة، بقدونس، خس، طماطم، بصل وبطاطا مقلية."),
        price: "10,700"
      }
    ]
  },

  snacks: {
    label: L("Snacks & plats", "Snacks & dishes", "Snack e piatti", "وجبات خفيفة وأطباق"),
    items: [
      {
        name: L("Lasagne", "Lasagne", "Lasagna", "لازانيا"),
        desc: L("Fromage, viande hachée, sauce lasagne.", "Cheese, minced meat, lasagne sauce.", "Formaggio, carne macinata, salsa per lasagne.", "جبن، لحم مفروم، صلصة لازانيا."),
        price: "16,500"
      },
      {
        name: L("Crispy 12 pièces", "Crispy 12 pcs", "Crispy 12 pezzi", "كريسبي 12 قطعة"),
        desc: null,
        price: "22,900"
      },
      {
        name: L("Crevettes panées, 9 pièces, avec sauce", "Breaded shrimp, 9 pcs, with sauce", "Gamberi panati, 9 pezzi, con salsa", "قريدس مقرمش، 9 قطع، مع صلصة"),
        desc: null,
        price: "17,900"
      },
      {
        name: L("Crispy 9 pièces", "Crispy 9 pcs", "Crispy 9 pezzi", "كريسبي 9 قطع"),
        desc: null,
        price: "17,900"
      },
      {
        name: L("Crispy 5 pièces", "Crispy 5 pcs", "Crispy 5 pezzi", "كريسبي 5 قطع"),
        desc: null,
        price: "9,900"
      }
    ]
  },

  drinks: {
    label: L("Boissons", "Drinks", "Bevande", "مشروبات"),
    items: [
      { name: L("Boga Cidre 24 cl", "Boga Cidre 24 cl", "Boga Cidre 24 cl", "بوغا سيدر 24 سل"), desc: null, price: "3,000" },
      { name: L("Coca-Cola 24 cl", "Coca-Cola 24 cl", "Coca-Cola 24 cl", "كوكا كولا 24 سل"), desc: null, price: "3,000" },
      { name: L("Fanta Orange 24 cl", "Fanta Orange 24 cl", "Fanta Orange 24 cl", "فانتا برتقال 24 سل"), desc: null, price: "3,000" },
      { name: L("Boga Lim 24 cl", "Boga Lim 24 cl", "Boga Lim 24 cl", "بوغا ليم 24 سل"), desc: null, price: "3,000" },
      { name: L("Apla 24 cl", "Apla 24 cl", "Apla 24 cl", "أبلا 24 سل"), desc: null, price: "3,000" },
      { name: L("Eau minérale 0,5 L", "Mineral water 0.5 L", "Acqua minerale 0,5 L", "ماء معدني 0.5 ل"), desc: null, price: "1,800" }
    ]
  }
};

const POPULAR = [
  { cat: "pizzas", index: 4, size: 0 },
  { cat: "pizzas", index: 4, size: 1 },
  { cat: "snacks", index: 1 }
];
