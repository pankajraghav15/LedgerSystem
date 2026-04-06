import Record from "../models/recordModel.js";

// Create Record
export const createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, description } = req.body;
        await Record.create({
            user: req.user._id,
            amount,
            type,
            category,
            date: date || Date.now(),
            description
        });
        res.redirect("/dashboard");
    } catch (err) {
        res.render("dashboard", { user: req.user, error: "Failed to add record" });
    }
};

// Get Dashboard Summary Data
export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Fetch all records for the user (Filtering can be added to query)
        const records = await Record.find({ user: userId }).sort({ date: -1 });

        // 2. Calculate Summaries using JavaScript (or MongoDB Aggregation)
        let totalIncome = 0;
        let totalExpense = 0;
        const categoryTotals = {};

        records.forEach(rec => {
            if (rec.type === 'income') {
                totalIncome += rec.amount;
            } else {
                totalExpense += rec.amount;
                // Category wise totals for expenses
                categoryTotals[rec.category] = (categoryTotals[rec.category] || 0) + rec.amount;
            }
        });

        const netBalance = totalIncome - totalExpense;

        // Render dashboard with user data AND financial data
        res.render("dashboard", { 
            user: req.user, 
            records, 
            summary: {
                totalIncome,
                totalExpense,
                netBalance,
                categoryTotals
            }
        });
    } catch (err) {
        console.error(err);
        res.redirect("/login");
    }
};

// Delete Record
export const deleteRecord = async (req, res) => {
    try {
        await Record.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/dashboard");
    }
};