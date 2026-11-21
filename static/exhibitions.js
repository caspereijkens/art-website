const table = document.querySelector("#exhibitions");
const rows = table.querySelectorAll("tbody tr");
const empty = document.querySelector("#exhibitions-empty");
const calendar = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

function showUpcoming() {
    const parts = Object.fromEntries(calendar.formatToParts().map(({ type, value }) => [type, value]));
    const today = `${parts.year}-${parts.month}-${parts.day}`;
    let hasUpcoming = false;
    for (const row of rows) {
        row.hidden = row.querySelector("time").dateTime < today;
        hasUpcoming ||= !row.hidden;
    }
    table.hidden = !hasUpcoming;
    empty.hidden = hasUpcoming;
}

showUpcoming();
window.addEventListener("pageshow", showUpcoming);
window.setInterval(showUpcoming, 60_000);
