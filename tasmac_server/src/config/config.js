module.exports = {
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tasmac_ecommerce'
  },
  tamilNaduDistricts: [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
    'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur',
    'Ranipet', 'Sivaganga', 'Karur', 'Kanchipuram', 'Tiruvannamalai', 'Krishnagiri',
    'Namakkal', 'Cuddalore', 'Virudhunagar', 'Ramanathapuram', 'Tirupattur',
    'Perambalur', 'Ariyalur', 'Kallakurichi', 'Nilgiris', 'Pudukkottai',
    'Nagapattinam', 'Viluppuram', 'Dharmapuri', 'Kanyakumari', 'Mayiladuthurai',
    'Tenkasi', 'Theni', 'Chengalpattu'
  ]
};