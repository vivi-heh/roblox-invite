export type GameScene =
  | 'WELCOME'
  | 'CUSTOMIZATION'
  | 'PREPARATION'
  | 'INVITATION'
  | 'ACCEPTED';

export type FaceId =
  | 'classic-smile'
  | 'big-grin'
  | 'wink'
  | 'starry-eyes'
  | 'cool-smirk'
  | 'sweet-blush'
  | 'surprised'
  | 'silly-tongue';

export type HairstyleId =
  | 'short'
  | 'long'
  | 'ponytail'
  | 'twin-ponytails'
  | 'bob'
  | 'curly'
  | 'spiky'
  | 'side-part'
  | 'space-buns'
  | 'braids'
  | 'mohawk'
  | 'afro';

export type TopId =
  | 'classic-tee'
  | 'cozy-hoodie'
  | 'varsity-jacket'
  | 'sunny-overalls'
  | 'rainbow-stripes'
  | 'starry-cardigan'
  | 'sporty-jersey'
  | 'party-vest'
  | 'dino-hoodie'
  | 'space-tee'
  | 'berry-sweater'
  | 'hero-tee';

export type BottomId =
  | 'blue-jeans'
  | 'cargo-pants'
  | 'sky-joggers'
  | 'starry-leggings'
  | 'khaki-shorts'
  | 'coral-shorts'
  | 'checker-shorts'
  | 'lavender-skirt'
  | 'lime-skirt'
  | 'sunny-skirt';

export type ShoeId =
  | 'coral-sneakers'
  | 'sky-hightops'
  | 'sunny-boots'
  | 'purple-skates'
  | 'lime-runners'
  | 'party-stars'
  | 'obsidian-kicks'
  | 'orange-flash';

export type AccessoryId =
  | 'none'
  | 'glasses'
  | 'star-shades'
  | 'hairband'
  | 'bow'
  | 'cap'
  | 'headphones'
  | 'crown'
  | 'cat-ears'
  | 'bunny-ears'
  | 'party-hat'
  | 'magic-hat';

export interface AvatarConfig {
  skinToneId: string;
  faceId: FaceId;
  hairstyleId: HairstyleId;
  hairColorId: string;
  topId: TopId;
  bottomId: BottomId;
  shoeId: ShoeId;
  accessoryId: AccessoryId;
}

export interface InventoryState {
  waterBottle: boolean;
  pencil: boolean;
}
