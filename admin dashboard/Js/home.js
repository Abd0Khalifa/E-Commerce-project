// التحكم في إظهار الشريط الجانبي
document.getElementById("toggleSidebar").addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
});

// رسم بياني باستخدام Chart.js
const ctx = document.getElementById("salesChart").getContext("2d");
const salesChart = new Chart(ctx, {
    type: "line", // نوع الرسم البياني
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // الأشهر
        datasets: [
            {
                label: "Sales",
                data: [1200, 1900, 3000, 5000, 2300, 4000, 7000], // بيانات المبيعات
                borderColor: "#007BFF",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    },
});
