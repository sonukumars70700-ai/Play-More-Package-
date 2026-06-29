/// <reference types="vite/client" />
import { Shield, Leaf, HeartPulse, CheckCircle, Package, Zap, Star, Sparkles } from 'lucide-react';

const names = ["Siddharth", "Deep Joshi", "Aryan", "Aditya", "Nitesh", "Pradeep Mandal", "Rohit Sinha", "Harsh Pandey", "Shivang", "Rohit", "Amit", "Vikas Yadav", "Sandeep Mehra", "Arjun Singh", "Karan Patel", "Rahul Sharma", "Aman Verma", "Akash Singh", "Ankit Mishra", "Sumit Gupta", "Sachin Verma", "Mohit Chauhan", "Abhishek Yadav", "Rakesh Kumar", "Nikhil Sharma", "Vivek Patel", "Lokesh Singh", "Dev Sharma", "Puneet Kumar", "Ajay Verma", "Tarun Mishra", "Neeraj Singh", "Kapil Yadav", "Hemant Sharma", "Manish Gupta", "Ravi Patel", "Yash Verma", "Shubham Raj", "Ashish Kumar", "Vinay Singh", "Saurabh Jain", "Kunal Sharma", "Naveen Kumar", "Anurag Gupta", "Abhay Singh", "Dinesh Patel", "Gaurav Mishra", "Pankaj Kumar", "Shivam Yadav", "Ritesh Verma", "Rohan Gupta", "Mayank Singh", "Faizan Khan", "Imran Sheikh", "Rajeev Kumar", "Aakash Tiwari", "Ritik Sharma", "Harshit Verma", "Nitin Chauhan", "Anmol Singh"];
const cities = ["Delhi", "Mumbai", "Noida", "Gurugram", "Lucknow", "Jaipur", "Ahmedabad", "Pune", "Hyderabad", "Bangalore", "Patna", "Surat", "Indore", "Nagpur", "Bhopal", "Varanasi", "Kanpur", "Chandigarh", "Ranchi", "Ludhiana"];
const reviewTemplates = [
    "Bhai kya product hai! Premium packaging aur quality ekdum top notch. Result bhi jaldi feel hone lagta hai.",
    "Very satisfied with PlayMore Max. Energy level poora din maintain rehta hai. Highly recommended for daily use.",
    "Taste thoda theek hai but mix easily ho jata hai. Delivery bahut fast thi. Will order combo next time.",
    "Great value for money. Maine capsules aur powder dono try kiye, overall wellness ke liye best laga.",
    "Packaging dekh ke hi luxury feel aati hai. I'm using this for 2 weeks now and definitely seeing the difference.",
    "Customer support is very good. Product is genuine and side effects free. Roz ka energy boost mast hai.",
    "Premium quality! Paise vasool product. Subah lene ke baad thakan feel nahi hoti poore din.",
    "Sirf 1 hafte use kiya hai aur active feel kar raha hu. The herbal ingredients give confidence.",
    "Delivery was quick. The gold packaging is beautiful. Quality ingredients hain, taste is also good.",
    "Best supplement I've tried so far. Very easy to incorporate in daily routine. 5 stars from me!",
    "I was skeptical pehle, but after using it, it's really working. No side effects, purely natural feel.",
    "Combo pack is totally worth it. Save bhi achha khasa ho jata hai aur stock bhi reh jata hai.",
    "Amazing product. Din bhar active rehne me help karta hai. Taste aur mixability bahut achhi hai.",
    "Trustworthy brand! Quality pe compromise nahi kiya hai inhone. Daily use ke liye safe hai.",
    "Bahut badhiya results mile hain. Fatigue aur tiredness ekdum gayab. Highly premium experience."
];

export const reviews = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    city: cities[i % cities.length],
    rating: Math.random() > 0.15 ? 5 : 4,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    text: reviewTemplates[i % reviewTemplates.length],
    helpfulCount: Math.floor(Math.random() * 100) + 10,
    avatar: names[i % names.length].charAt(0)
}));

export const packages = [
  {
    id: 'powder',
    title: 'PlayMore Max Powder',
    price: '999',
    originalPrice: '1,499',
    features: ['1 Month Supply', 'Premium Gold Box', 'Easy to mix'],
    popular: false,
    url: 'https://superprofile.bio/vp/unlock-your-energy'
  },
  {
    id: 'capsules',
    title: 'PlayMore Max Capsules',
    price: '1,499',
    originalPrice: '2,299',
    features: ['60 Capsules', 'On-the-go convenience', 'Fast absorption'],
    popular: false,
    url: 'https://superprofile.bio/vp/FuelYourFitness-Journey'
  },
  {
    id: 'combo',
    title: '👑 PlayMore Max Ultimate Combo',
    price: '3,499',
    originalPrice: '4,996',
    features: ['2 × Powder', '2 × Capsules', 'Complete 3 Month Supply', 'Free Priority Shipping'],
    save: '1,497',
    popular: true,
    url: 'https://superprofile.bio/vp/increase-your-power'
  }
];

export const features = [
  { icon: Shield, title: 'Trusted Formula', description: 'Scientifically backed for safety.' },
  { icon: Leaf, title: 'Premium Ingredients', description: 'Sourced from the finest natural herbs.' },
  { icon: CheckCircle, title: 'Quality Checked', description: 'Rigorously tested at every step.' },
  { icon: Package, title: 'Premium Packaging', description: 'Luxurious and secure containers.' },
  { icon: HeartPulse, title: 'Daily Wellness', description: 'Supports your overall wellbeing.' },
  { icon: Zap, title: 'Modern Production', description: 'Manufactured in state-of-the-art facilities.' }
];

export const benefits = [
  'Supports Daily Energy',
  'Supports Active Lifestyle',
  'Helps Reduce Daily Fatigue',
  'Natural Herbal Ingredients',
  'Premium Formula',
  'Easy To Use'
];

export const ingredients = [
  {
    name: 'Ashwagandha',
    description: 'Ancient adaptogen known to help the body manage stress.'
  },
  {
    name: 'Shilajit',
    description: 'Mineral-rich resin sourced from the high Himalayas.'
  },
  {
    name: 'Safed Musli',
    description: 'Traditional herb recognized for supporting vitality.'
  }
];

export const faqs = [
  {
    q: 'Is PlayMore Max Safe?',
    a: 'Yes, PlayMore Max is made with premium, natural herbal ingredients and is manufactured in certified facilities following strict quality control standards.'
  },
  {
    q: 'How Long Before I Notice Results?',
    a: 'While individual results vary, many users report feeling a difference in energy levels within the first 1 to 2 weeks of consistent daily use.'
  },
  {
    q: 'Can I Take It Daily?',
    a: 'Absolutely. The formula is specifically designed for daily consumption to support an active lifestyle and overall wellness.'
  },
  {
    q: 'Are There Any Side Effects?',
    a: 'PlayMore Max contains natural ingredients that are generally well-tolerated. However, if you have specific medical conditions, please consult your physician first.'
  },
  {
    q: 'Is It Suitable For All Adults?',
    a: 'Yes, our premium formula is designed for adult men looking to support their active lifestyle and daily energy levels.'
  }
];
