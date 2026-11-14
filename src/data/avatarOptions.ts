import {
  AccessoryId,
  AvatarConfig,
  BottomId,
  FaceId,
  HairstyleId,
  ShoeId,
  TopId,
} from '../types/game';

export interface SwatchOption {
  id: string;
  label: string;
  hex: string;
  shadowHex: string;
  highlightHex: string;
}

export interface FaceOption {
  id: FaceId;
  label: string;
}

export interface HairstyleOption {
  id: HairstyleId;
  label: string;
}

export interface TopOption {
  id: TopId;
  label: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  longSleeve: boolean;
}

export interface BottomOption {
  id: BottomId;
  label: string;
  category: 'trousers' | 'shorts' | 'skirt';
  primaryHex: string;
  shadowHex: string;
}

export interface ShoeOption {
  id: ShoeId;
  label: string;
  primaryHex: string;
  soleHex: string;
  stripeHex: string;
}

export interface AccessoryOption {
  id: AccessoryId;
  label: string;
  swatchHex: string;
}

export const SKIN_TONES: SwatchOption[] = [
  { id: 'porcelain', label: 'Porcelain', hex: '#FFE2CE', shadowHex: '#ECC1A6', highlightHex: '#FFF1E6' },
  { id: 'warm-fair', label: 'Warm Fair', hex: '#F7C9A2', shadowHex: '#DFA477', highlightHex: '#FDE0C7' },
  { id: 'peach-glow', label: 'Apricot', hex: '#F3B48E', shadowHex: '#D88F68', highlightHex: '#FAD0B6' },
  { id: 'honey', label: 'Golden Honey', hex: '#E3A470', shadowHex: '#C5824F', highlightHex: '#F2C095' },
  { id: 'caramel', label: 'Caramel', hex: '#C68252', shadowHex: '#A56438', highlightHex: '#DAA075' },
  { id: 'chestnut', label: 'Chestnut', hex: '#945834', shadowHex: '#734022', highlightHex: '#AE724E' },
  { id: 'cocoa', label: 'Rich Cocoa', hex: '#6E3E26', shadowHex: '#522A16', highlightHex: '#87553B' },
  { id: 'espresso', label: 'Espresso', hex: '#4E2B1A', shadowHex: '#371B0E', highlightHex: '#663E2A' },
];

export const FACES: FaceOption[] = [
  { id: 'classic-smile', label: 'Classic Smile' },
  { id: 'big-grin', label: 'Big Grin' },
  { id: 'wink', label: 'Playful Wink' },
  { id: 'starry-eyes', label: 'Starry Eyes' },
  { id: 'cool-smirk', label: 'Cool Smirk' },
  { id: 'sweet-blush', label: 'Sweet Blush' },
  { id: 'surprised', label: 'Whoa Face' },
  { id: 'silly-tongue', label: 'Silly Face' },
];

export const HAIRSTYLES: HairstyleOption[] = [
  { id: 'short', label: 'Short Hair' },
  { id: 'long', label: 'Long Hair' },
  { id: 'ponytail', label: 'Ponytail' },
  { id: 'twin-ponytails', label: 'Twin Ponytails' },
  { id: 'bob', label: 'Bob Cut' },
  { id: 'curly', label: 'Curly Hair' },
  { id: 'spiky', label: 'Spiky Hair' },
  { id: 'side-part', label: 'Side-Parted' },
  { id: 'space-buns', label: 'Space Buns' },
  { id: 'braids', label: 'Twin Braids' },
  { id: 'mohawk', label: 'Cool Mohawk' },
  { id: 'afro', label: 'Fluffy Afro' },
];

export const HAIR_COLORS: SwatchOption[] = [
  { id: 'jet-black', label: 'Jet Black', hex: '#262936', shadowHex: '#151720', highlightHex: '#43485C' },
  { id: 'espresso-brown', label: 'Dark Brown', hex: '#593622', shadowHex: '#3D2214', highlightHex: '#784E36' },
  { id: 'chestnut-red', label: 'Chestnut', hex: '#8F4726', shadowHex: '#6B3016', highlightHex: '#B0623E' },
  { id: 'sunny-blonde', label: 'Golden Blonde', hex: '#F0BD42', shadowHex: '#CA9722', highlightHex: '#FAD473' },
  { id: 'tangerine', label: 'Bright Ginger', hex: '#E86C28', shadowHex: '#C24E12', highlightHex: '#F58F54' },
  { id: 'bubblegum', label: 'Coral Pink', hex: '#E95D7A', shadowHex: '#C43E5B', highlightHex: '#F4889F' },
  { id: 'sky-blue', label: 'Sky Blue', hex: '#2D9CDB', shadowHex: '#1C78B0', highlightHex: '#5FB8EC' },
  { id: 'grape', label: 'Party Purple', hex: '#7B4B94', shadowHex: '#5A3170', highlightHex: '#9E6EB8' },
  { id: 'lime-mint', label: 'Lime Mint', hex: '#58B647', shadowHex: '#3E8F30', highlightHex: '#7ED06E' },
  { id: 'silver-snow', label: 'Silver Frost', hex: '#D8E1EC', shadowHex: '#A7B5C8', highlightHex: '#F3F7FC' },
  { id: 'aqua-teal', label: 'Ocean Teal', hex: '#1AA6B7', shadowHex: '#107B88', highlightHex: '#4EC9D8' },
  { id: 'cotton-candy', label: 'Lilac Pink', hex: '#D58CE2', shadowHex: '#AD63BA', highlightHex: '#EAB6F4' },
];

export const TOPS: TopOption[] = [
  { id: 'classic-tee', label: 'Coral Star Tee', primaryHex: '#E95D7A', secondaryHex: '#FFFFFF', accentHex: '#F8C630', longSleeve: false },
  { id: 'cozy-hoodie', label: 'Sky Hoodie', primaryHex: '#2D9CDB', secondaryHex: '#1E76AB', accentHex: '#F8C630', longSleeve: true },
  { id: 'varsity-jacket', label: 'Purple Varsity', primaryHex: '#7B4B94', secondaryHex: '#FFF6E0', accentHex: '#F47C20', longSleeve: true },
  { id: 'sunny-overalls', label: 'Sunny Overalls', primaryHex: '#F8C630', secondaryHex: '#326BB2', accentHex: '#FFFFFF', longSleeve: false },
  { id: 'rainbow-stripes', label: 'Party Stripes', primaryHex: '#FFF8EB', secondaryHex: '#E95D7A', accentHex: '#7AC143', longSleeve: true },
  { id: 'starry-cardigan', label: 'Lime Cardigan', primaryHex: '#7AC143', secondaryHex: '#FFFFFF', accentHex: '#F8C630', longSleeve: true },
  { id: 'sporty-jersey', label: 'Orange Jersey', primaryHex: '#F47C20', secondaryHex: '#FFFFFF', accentHex: '#2D9CDB', longSleeve: false },
  { id: 'party-vest', label: 'Party Bowtie Vest', primaryHex: '#2C3E6B', secondaryHex: '#FFFFFF', accentHex: '#E95D7A', longSleeve: true },
  { id: 'dino-hoodie', label: 'Dino Hoodie', primaryHex: '#5CB847', secondaryHex: '#F8C630', accentHex: '#3E8F30', longSleeve: true },
  { id: 'space-tee', label: 'Galaxy Tee', primaryHex: '#23325B', secondaryHex: '#F8C630', accentHex: '#5EC8F2', longSleeve: false },
  { id: 'berry-sweater', label: 'Berry Sweater', primaryHex: '#F48FB1', secondaryHex: '#FFFFFF', accentHex: '#E95D7A', longSleeve: true },
  { id: 'hero-tee', label: 'Hero Bolt Tee', primaryHex: '#1E88E5', secondaryHex: '#F8C630', accentHex: '#E95D7A', longSleeve: false },
];

export const BOTTOMS: BottomOption[] = [
  { id: 'blue-jeans', label: 'Classic Jeans', category: 'trousers', primaryHex: '#2F61A6', shadowHex: '#1F4780' },
  { id: 'cargo-pants', label: 'Slate Trousers', category: 'trousers', primaryHex: '#434C63', shadowHex: '#2D3447' },
  { id: 'sky-joggers', label: 'Sky Joggers', category: 'trousers', primaryHex: '#2D9CDB', shadowHex: '#1C78B0' },
  { id: 'starry-leggings', label: 'Starry Pants', category: 'trousers', primaryHex: '#6F4299', shadowHex: '#4D2B70' },
  { id: 'khaki-shorts', label: 'Sunny Shorts', category: 'shorts', primaryHex: '#E7B564', shadowHex: '#C79240' },
  { id: 'coral-shorts', label: 'Coral Shorts', category: 'shorts', primaryHex: '#E95D7A', shadowHex: '#C23F5B' },
  { id: 'checker-shorts', label: 'Checker Shorts', category: 'shorts', primaryHex: '#2C3E6B', shadowHex: '#1A2647' },
  { id: 'lavender-skirt', label: 'Purple Skirt', category: 'skirt', primaryHex: '#8454A6', shadowHex: '#633A82' },
  { id: 'lime-skirt', label: 'Lime Skirt', category: 'skirt', primaryHex: '#6BB840', shadowHex: '#4E9229' },
  { id: 'sunny-skirt', label: 'Yellow Skirt', category: 'skirt', primaryHex: '#F8C630', shadowHex: '#D5A212' },
];

export const SHOES: ShoeOption[] = [
  { id: 'coral-sneakers', label: 'Coral Kicks', primaryHex: '#E95D7A', soleHex: '#FFFFFF', stripeHex: '#FFFFFF' },
  { id: 'sky-hightops', label: 'Sky Hi-Tops', primaryHex: '#2D9CDB', soleHex: '#FFFFFF', stripeHex: '#F8C630' },
  { id: 'sunny-boots', label: 'Sunny Boots', primaryHex: '#F8C630', soleHex: '#334155', stripeHex: '#FFFFFF' },
  { id: 'purple-skates', label: 'Purple Skates', primaryHex: '#7B4B94', soleHex: '#FFFFFF', stripeHex: '#5EC8F2' },
  { id: 'lime-runners', label: 'Lime Runners', primaryHex: '#7AC143', soleHex: '#FFFFFF', stripeHex: '#F8C630' },
  { id: 'party-stars', label: 'Starry Shoes', primaryHex: '#2C3E6B', soleHex: '#F8C630', stripeHex: '#E95D7A' },
  { id: 'obsidian-kicks', label: 'Classic Black', primaryHex: '#262936', soleHex: '#FFFFFF', stripeHex: '#FFFFFF' },
  { id: 'orange-flash', label: 'Orange Flash', primaryHex: '#F47C20', soleHex: '#FFFFFF', stripeHex: '#F8C630' },
];

export const ACCESSORIES: AccessoryOption[] = [
  { id: 'none', label: 'No Accessory', swatchHex: '#CBD5E1' },
  { id: 'glasses', label: 'Cool Glasses', swatchHex: '#2C3E6B' },
  { id: 'star-shades', label: 'Party Shades', swatchHex: '#E95D7A' },
  { id: 'hairband', label: 'Party Hairband', swatchHex: '#2D9CDB' },
  { id: 'bow', label: 'Big Party Bow', swatchHex: '#F47C20' },
  { id: 'cap', label: 'Blocky Cap', swatchHex: '#7AC143' },
  { id: 'headphones', label: 'Headphones', swatchHex: '#7B4B94' },
  { id: 'crown', label: 'Party Crown', swatchHex: '#F8C630' },
  { id: 'cat-ears', label: 'Cat Ears', swatchHex: '#E95D7A' },
  { id: 'bunny-ears', label: 'Bunny Ears', swatchHex: '#F48FB1' },
  { id: 'party-hat', label: 'Party Cone Hat', swatchHex: '#2D9CDB' },
  { id: 'magic-hat', label: 'Wizard Hat', swatchHex: '#7B4B94' },
];

export function getSkinTone(id: string): SwatchOption {
  return SKIN_TONES.find((s) => s.id === id) ?? SKIN_TONES[1];
}

export function getFaceOption(id: FaceId): FaceOption {
  return FACES.find((f) => f.id === id) ?? FACES[0];
}

export function getHairColor(id: string): SwatchOption {
  return HAIR_COLORS.find((c) => c.id === id) ?? HAIR_COLORS[1];
}

export function getTopOption(id: TopId): TopOption {
  return TOPS.find((t) => t.id === id) ?? TOPS[0];
}

export function getBottomOption(id: BottomId): BottomOption {
  return BOTTOMS.find((b) => b.id === id) ?? BOTTOMS[0];
}

export function getShoeOption(id: ShoeId): ShoeOption {
  return SHOES.find((s) => s.id === id) ?? SHOES[0];
}

export function getAccessoryOption(id: AccessoryId): AccessoryOption {
  return ACCESSORIES.find((a) => a.id === id) ?? ACCESSORIES[0];
}

export function getHairstyleOption(id: HairstyleId): HairstyleOption {
  return HAIRSTYLES.find((h) => h.id === id) ?? HAIRSTYLES[0];
}

export function createDefaultAvatar(): AvatarConfig {
  return {
    skinToneId: 'warm-fair',
    faceId: 'classic-smile',
    hairstyleId: 'short',
    hairColorId: 'espresso-brown',
    topId: 'classic-tee',
    bottomId: 'blue-jeans',
    shoeId: 'coral-sneakers',
    accessoryId: 'none',
  };
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateRandomAvatar(): AvatarConfig {
  return {
    skinToneId: pickRandom(SKIN_TONES).id,
    faceId: pickRandom(FACES).id,
    hairstyleId: pickRandom(HAIRSTYLES).id,
    hairColorId: pickRandom(HAIR_COLORS).id,
    topId: pickRandom(TOPS).id,
    bottomId: pickRandom(BOTTOMS).id,
    shoeId: pickRandom(SHOES).id,
    accessoryId: pickRandom(ACCESSORIES).id,
  };
}
