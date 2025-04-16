import mongoose from 'mongoose';

// متغير لتخزين حالة الاتصال
let isConnected = false;

export const connectToDatabase = async () => {
  // إذا كان الاتصال موجود بالفعل، لا داعي لإعادة الاتصال
  if (isConnected) {
    console.log('=> استخدام اتصال قاعدة البيانات الموجود');
    return;
  }

  try {
    // استخدام متغير البيئة لرابط MongoDB أو استخدام رابط محلي للتطوير
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ewallets-comparison';
    
    const db = await mongoose.connect(MONGODB_URI);
    
    isConnected = !!db.connections[0].readyState;
    
    console.log('=> تم الاتصال بقاعدة البيانات بنجاح');
  } catch (error) {
    console.error('=> خطأ في الاتصال بقاعدة البيانات:', error);
    throw new Error('فشل الاتصال بقاعدة البيانات');
  }
};

export const disconnectFromDatabase = async () => {
  if (!isConnected) {
    return;
  }
  
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('=> تم قطع الاتصال بقاعدة البيانات');
  } catch (error) {
    console.error('=> خطأ في قطع الاتصال بقاعدة البيانات:', error);
    throw new Error('فشل قطع الاتصال بقاعدة البيانات');
  }
};
