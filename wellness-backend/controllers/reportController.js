const PDFDocument = require("pdfkit");
const db = require("../config/db");

exports.generateReport = (req, res) => {
  const user_id = req.user.id;

  const query = `
    SELECT * FROM assessments 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `;

  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.json({ msg: "No data found" });

    const data = result[0];

    // 📄 Create PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    doc.pipe(res);

    // 🧾 Title
    doc.fontSize(20).text("Wellness Report", { align: "center" });
    doc.moveDown();

    // 📊 Score
    doc.fontSize(14).text(`Overall Score: ${data.score}`);
    doc.moveDown();

    // 📌 Categories
    doc.text(`Physical: ${data.physical}`);
    doc.text(`Mental: ${data.mental}`);
    doc.text(`Emotional: ${data.emotional}`);
    doc.text(`Lifestyle: ${data.lifestyle}`);
    doc.moveDown();

    // 📅 Date
    doc.text(`Date: ${data.created_at}`);
    doc.moveDown();

    // 🧠 Basic Recommendation Logic
    doc.text("Recommendations:");

    if (data.physical < 60)
      doc.text("- Increase physical activity");

    if (data.mental < 60)
      doc.text("- Practice mindfulness");

    if (data.emotional < 60)
      doc.text("- Manage stress effectively");

    if (data.lifestyle < 60)
      doc.text("- Improve sleep and diet");

    doc.end();
  });
};