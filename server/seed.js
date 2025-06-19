const mongoose = require('mongoose');
const User = require('./models/User');
const Lamp = require('./models/Lamp');
require('dotenv').config();

// Connessione al database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

// Dati di esempio per le lampade
const lamps = [
  {
    name: 'Silva',
    description: 'Lampada da tavolo con struttura in legno e paralume in lino, ispirata alla natura.',
    price: 89.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365060/indi-pendant-cylinder-5-lampade-a-sospensione_usfj9w.jpg',
  },
  {
    name: 'Notte',
    description: 'Lampada a sospensione minimalista con luce calda, perfetta per ambienti intimi.',
    price: 129.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365060/KYUDO2_hvmsph.jpg',
  },
  {
    name: 'Vita',
    description: 'Lampada da terra dal design organico con luce diffusa, ideale per il relax.',
    price: 159.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365059/gallottiradice_lampade_bolle_preview_0_hzwajb.jpg',
  },
  {
    name: 'Aurora',
    description: 'Lampada con vetro opalino e base dorata, illumina con eleganza ogni stanza.',
    price: 199.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365058/rays_900x900_design04-500x500_h4onmp.jpg',
  },
  {
    name: 'Nebula',
    description: 'Lampada sospesa con design futuristico, effetto luce dinamico.',
    price: 249.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365058/315_LT_2_axd6i9.jpg',
  },
  {
    name: 'Terra',
    description: 'Lampada con base in ceramica e paralume artigianale, perfetta per interni rustici.',
    price: 109.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365058/birdie-easy_t_light-blue_22_786x865-6_mbyvib.jpg',
  },
  {
    name: 'Lumen',
    description: 'Lampada da scrivania regolabile con finiture in acciaio satinato.',
    price: 79.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365057/atollo233-01-1_utzud9.jpg',
  },
  {
    name: 'Eclisse',
    description: 'Lampada sferica in metallo lucido, riflette e diffonde la luce in modo unico.',
    price: 139.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365056/Lampade.a-sospensione-Lighthing-PLANET-per-Residenziale-Hotel-2_eou1n5.jpg',
  },
  {
    name: 'Aria',
    description: 'Lampada ultra leggera in carta di riso e bambù, sospesa come una nuvola.',
    price: 119.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365662/set-di-3-lampade-a-sospensione-nordiche-solvang-helga-kolding_zooder.jpg',
  },
  {
    name: 'Halo',
    description: 'Lampada LED a forma di anello, moderna e affascinante.',
    price: 99.99,
    image: 'https://res.cloudinary.com/dagep4tzc/image/upload/v1750365060/indi-pendant-cylinder-5-lampade-a-sospensione_usfj9w.jpg',
  },
];

// Dati di esempio per un utente (opzionale, per testare la registrazione)


// Funzione per popolare il database
async function seedDB() {
  try {
    // Pulisci le collezioni esistenti
    await Lamp.deleteMany({});
    await User.deleteMany({});

    // Inserisci le lampade
    const insertedLamps = await Lamp.insertMany(lamps);
    console.log('Lamps seeded:', insertedLamps);

    

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();