
//旅行一覧カードの表示//
const tripCard = document.querySelector(".trip-cards");

function renderTrips() {
    tripCard.textContent = "";

    if (trips.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("trips__empty");
        empty.textContent = "まだ旅行の記録がありません。新しい旅行記録を追加してください。";
        tripCard.append(empty);
        return;
    }
    trips.forEach((trip) => {
        const card = document.createElement("div");
        card.classList.add("trip-card");
        
        const img = document.createElement("img");
        img.src = trip.mainImage;
        img.alt = trip.title;

        const content = document.createElement("div");
        content.classList.add("trip-card__content");
        
        const title = document.createElement("h2");
        title.textContent = trip.title;
        
        const date = document.createElement("p");
        date.classList.add("detail-info__date");

        const startTime = document.createElement("time");
        startTime.dateTime = trip.startDate;
        startTime.textContent = trip.startDate;

        const endTime = document.createElement("time");
        endTime.dateTime = trip.endDate;
        endTime.textContent = trip.endDate;
        date.append( startTime, " ~ ", endTime);
        
        const text = document.createElement("p");
        text.textContent = trip.text;

        const link = document.createElement("a");
        link.href = `./details.html?id=${trip.id}`;
        link.textContent = "詳細を見る";

        content.append(title, date, text, link);
        card.append(img, content);
        tripCard.append(card);
    });
}
renderTrips();

