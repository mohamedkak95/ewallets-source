// src/lib/testing/test-runner.ts

import { runTests, generateTestReport, testCases } from './test-cases';

/**
 * أداة تشغيل الاختبارات
 * تستخدم لتنفيذ اختبارات الموقع وإنشاء تقارير الاختبار
 */

// دالة لتنفيذ جميع الاختبارات
export async function runAllTests() {
  console.log('بدء تنفيذ جميع الاختبارات...');
  
  const allResults = [];
  const categories = Object.keys(testCases) as Array<keyof typeof testCases>;
  
  for (const category of categories) {
    console.log(`تنفيذ اختبارات فئة: ${category}`);
    const results = await runTests(category);
    allResults.push(...results.map(result => ({ ...result, category })));
  }
  
  const report = generateTestReport(allResults);
  console.log('تم الانتهاء من تنفيذ جميع الاختبارات');
  console.log(`إجمالي الاختبارات: ${report.totalTests}`);
  console.log(`الاختبارات الناجحة: ${report.passedTests}`);
  console.log(`الاختبارات الفاشلة: ${report.failedTests}`);
  console.log(`نسبة النجاح: ${report.passRate.toFixed(2)}%`);
  
  return report;
}

// دالة لتنفيذ اختبارات فئة معينة
export async function runCategoryTests(category: keyof typeof testCases) {
  console.log(`بدء تنفيذ اختبارات فئة: ${category}`);
  
  const results = await runTests(category);
  const report = generateTestReport(results);
  
  console.log(`تم الانتهاء من تنفيذ اختبارات فئة: ${category}`);
  console.log(`إجمالي الاختبارات: ${report.totalTests}`);
  console.log(`الاختبارات الناجحة: ${report.passedTests}`);
  console.log(`الاختبارات الفاشلة: ${report.failedTests}`);
  console.log(`نسبة النجاح: ${report.passRate.toFixed(2)}%`);
  
  return report;
}

// دالة لتنفيذ اختبار التوافق مع مختلف أحجام الشاشات
export async function runResponsiveTests() {
  return runCategoryTests('responsiveDesign');
}

// دالة لتنفيذ اختبار الأداء
export async function runPerformanceTests() {
  return runCategoryTests('performance');
}

// دالة لإنشاء تقرير HTML للاختبارات
export function generateHtmlReport(report: any) {
  const html = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تقرير اختبار موقع مقارنة المحافظ الإلكترونية</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
        h1 {
          color: #2563eb;
          text-align: center;
          margin-bottom: 30px;
        }
        .summary {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          text-align: center;
        }
        .summary-item {
          padding: 15px;
          border-radius: 8px;
        }
        .total {
          background-color: #dbeafe;
          color: #1e40af;
        }
        .passed {
          background-color: #d1fae5;
          color: #065f46;
        }
        .failed {
          background-color: #fee2e2;
          color: #b91c1c;
        }
        .rate {
          background-color: #e0e7ff;
          color: #3730a3;
        }
        .test-results {
          margin-top: 30px;
        }
        .category {
          margin-bottom: 20px;
        }
        .category-title {
          background-color: #e5e7eb;
          padding: 10px 15px;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .test-item {
          padding: 15px;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .test-item.passed {
          border-right: 5px solid #10b981;
        }
        .test-item.failed {
          border-right: 5px solid #ef4444;
        }
        .test-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .test-message {
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>تقرير اختبار موقع مقارنة المحافظ الإلكترونية</h1>
        
        <div class="summary">
          <div class="summary-grid">
            <div class="summary-item total">
              <h2>إجمالي الاختبارات</h2>
              <p>${report.totalTests}</p>
            </div>
            <div class="summary-item passed">
              <h2>الاختبارات الناجحة</h2>
              <p>${report.passedTests}</p>
            </div>
            <div class="summary-item failed">
              <h2>الاختبارات الفاشلة</h2>
              <p>${report.failedTests}</p>
            </div>
            <div class="summary-item rate">
              <h2>نسبة النجاح</h2>
              <p>${report.passRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
        
        <div class="test-results">
          ${Object.keys(testCases).map(category => {
            const categoryResults = report.results.filter((result: any) => result.category === category);
            if (categoryResults.length === 0) return '';
            
            return `
              <div class="category">
                <h2 class="category-title">${category}</h2>
                ${categoryResults.map((result: any) => `
                  <div class="test-item ${result.passed ? 'passed' : 'failed'}">
                    <div class="test-name">${result.name}</div>
                    <div class="test-message">${result.message}</div>
                  </div>
                `).join('')}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

// تصدير الدوال
export default {
  runAllTests,
  runCategoryTests,
  runResponsiveTests,
  runPerformanceTests,
  generateHtmlReport
};
