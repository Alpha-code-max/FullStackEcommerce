import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  { id: 'all', name: 'All Products' },
  { id: 'cement', name: 'Cement', description: 'High-quality cement for all construction needs' },
  { id: 'steel-rods', name: 'Steel Rods', description: 'Different sizes of reinforcement rods' },
  { id: 'pipes', name: 'Pipes', description: 'PVC, iron, and galvanized pipes for plumbing and construction' },
  { id: 'nails', name: 'Nails & Fasteners', description: 'Durable nails and fasteners of different sizes' },
  { id: 'others', name: 'Other Materials', description: 'Additional construction and building supplies' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Dangote Cement (50kg Bag)',
    description: 'Premium quality cement suitable for all kinds of building and construction projects.',
    price: 5000,
    category: 'cement',
    inStock: true,
    features: ['50kg Bag', 'High Strength', 'Fast Setting', 'Durable']
  },
  {
    id: '2',
    name: 'BUA Cement (50kg Bag)',
    description: 'Trusted cement brand for strong and reliable construction work.',
    price: 4800,
    category: 'cement',
    inStock: true,
    features: ['50kg Bag', 'Reliable Strength', 'Affordable', 'Durable']
  },
  {
    id: '3',
    name: '8mm Steel Rod',
    description: 'High tensile steel reinforcement rod, 8mm diameter, ideal for light structural works.',
    price: 4500,
    category: 'steel-rods',
    inStock: true,
    features: ['8mm Diameter', 'High Tensile Strength', 'Corrosion Resistant', 'Sold Per Length']
  },
  {
    id: '4',
    name: '10mm Steel Rod',
    description: 'Strong 10mm reinforcement rod for medium structural reinforcement.',
    price: 5500,
    category: 'steel-rods',
    inStock: true,
    features: ['10mm Diameter', 'Durable', 'Corrosion Resistant', 'Sold Per Length']
  },
  {
    id: '5',
    name: '12mm Steel Rod',
    description: '12mm reinforcement rod for strong structural support in construction.',
    price: 7000,
    category: 'steel-rods',
    inStock: true,
    features: ['12mm Diameter', 'High Strength', 'Reliable', 'Sold Per Length']
  },
  {
    id: '6',
    name: '16mm Steel Rod',
    description: 'Heavy-duty reinforcement rod, ideal for foundations and large structures.',
    price: 9500,
    category: 'steel-rods',
    inStock: true,
    features: ['16mm Diameter', 'Heavy Duty', 'Corrosion Resistant', 'Sold Per Length']
  },
  {
    id: '7',
    name: 'PVC Pipe (3 Inch)',
    description: 'Durable PVC pipe, suitable for plumbing and drainage systems.',
    price: 3500,
    category: 'pipes',
    inStock: true,
    features: ['3 Inch Diameter', 'Lightweight', 'Durable', 'Long Lasting']
  },
  {
    id: '8',
    name: 'Galvanized Iron Pipe (1 Inch)',
    description: 'Strong GI pipe used for water supply and structural applications.',
    price: 4200,
    category: 'pipes',
    inStock: true,
    features: ['1 Inch Diameter', 'Rust Resistant', 'Durable', 'Heavy Duty']
  },
  {
    id: '9',
    name: '2 Inch Iron Pipe',
    description: 'Heavy iron pipe for plumbing and structural projects.',
    price: 6000,
    category: 'pipes',
    inStock: true,
    features: ['2 Inch Diameter', 'Durable', 'Strong', 'Long Lasting']
  },
  {
    id: '10',
    name: '2-Inch Nails (1kg Pack)',
    description: 'Durable steel nails, perfect for general carpentry and building projects.',
    price: 1000,
    category: 'nails',
    inStock: true,
    features: ['2 Inches', 'Rust Resistant', 'Strong Hold', '1kg Pack']
  },
  {
    id: '11',
    name: '3-Inch Nails (1kg Pack)',
    description: 'Longer nails for stronger fastening in wood and concrete work.',
    price: 1200,
    category: 'nails',
    inStock: true,
    features: ['3 Inches', 'Durable', 'Rust Resistant', '1kg Pack']
  },
  {
    id: '12',
    name: 'Binding Wire (Roll)',
    description: 'High-strength binding wire used to tie reinforcement rods during construction.',
    price: 2500,
    category: 'others',
    inStock: true,
    features: ['Flexible', 'Durable', 'High Strength', '1 Roll']
  },
  {
    id: '13',
    name: 'Wheelbarrow',
    description: 'Heavy-duty wheelbarrow for carrying construction materials easily.',
    price: 15000,
    category: 'others',
    inStock: true,
    features: ['Durable Steel Tray', 'Strong Handles', 'Pneumatic Tyre', 'Heavy Duty']
  },
  {
    id: '14',
    name: 'Shovel',
    description: 'Strong steel shovel for construction and digging work.',
    price: 3500,
    category: 'others',
    inStock: true,
    features: ['Steel Blade', 'Wooden Handle', 'Durable', 'Multipurpose Use']
  }
];
