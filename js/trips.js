//旅行一覧カードの表示//
const savedTrips =  localStorage.getItem("trips");
let trips = savedTrips
    ? JSON.parse(savedTrips)
    : [];
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
        
        const actions = document.createElement("div");
        actions.classList.add("trip-card__actions");

        const editButton = document.createElement("button");
        editButton.classList.add("actions");
        editButton.type = "button";
        editButton.textContent = "編集";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("actions");
        deleteButton.type = "button";
        deleteButton.textContent = "削除";

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
        link.classList.add("show-detail");
        link.href = `./details.html?id=${trip.id}`;
        link.textContent = "詳細を見る";

        actions.append(editButton, deleteButton);
        content.append(title, date, text, link, actions);
        card.append(img, content);
        tripCard.append(card);

        //削除機能//
        deleteButton.addEventListener("click", () => {
            if (confirm("この旅行記録を削除しますか？")) {
                trips = trips.filter((item) => {
                    return item.id !== trip.id 
                });
                localStorage.setItem("trips", JSON.stringify(trips));
                renderTrips();
            }
        });   
        //編集機能//
        editButton.addEventListener("click", () => {
            window.location.href = `./details.html?id=${trip.id}&mode=edit`;
        });
    });
}
renderTrips();
