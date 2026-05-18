//詳細を見るを押された時のIDに対応したdetailページの表示//
const params = new URLSearchParams(window.location.search);
const tripId = Number(params.get("id"));
console.log(tripId);
const currentTrip = trips.find((trip) => {return trip.id === tripId});

//detailページの内容の表示//
const titles = document.querySelectorAll(".info-title");
titles.forEach((title) => {
    title.textContent = currentTrip.title;
});
document.querySelector(".detail-hero__image").src = currentTrip.image;
document.querySelector(".detail-hero__image").alt = currentTrip.title;

//基本情報の内容の表示//
const detailInfoContent = document.querySelector(".detail-info__content");
function renderDetail(currentTrip) {
  detailInfoContent.textContent = "";

  const date = document.createElement("p");
  date.classList.add("detail-info__date");

  const startTime = document.createElement("time");
  startTime.dateTime = currentTrip.startDate;
  startTime.textContent = currentTrip.startDate;

  const endTime = document.createElement("time");
  endTime.dateTime = currentTrip.endDate;
  endTime.textContent = currentTrip.endDate;
  date.append( startTime, " ~ ", endTime);

  const destination = document.createElement("p");
  destination.textContent = `旅行先：${currentTrip.destination}`;

  const memo = document.createElement("p");
  memo.textContent = `一言メモ：${currentTrip.text}`;

  detailInfoContent.append(
    date,
    destination,
    memo
  );
}
renderDetail(currentTrip);

//タブの切り替え//
const tabs = document.querySelectorAll(".detail-tab");
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((tab) => {
            tab.setAttribute("aria-selected", "false");
        });
        const panels = document.querySelectorAll(".panel__inner");
        panels.forEach((panel) => {
            panel.setAttribute("aria-hidden", "true");
        });
        
        
        tab.setAttribute("aria-selected", "true");
        const panelId = tab.getAttribute("aria-controls");
        const targetPanel = document.getElementById(panelId);
        targetPanel.setAttribute("aria-hidden", "false");
    });
});    

//新しい旅行記録の追加//
const mode = params.get("mode");
if(mode === "new") {
    function renderTripForm() {
        detailInfoContent.textContent = "";

        document.querySelector(".info-title").textContent = "新しい旅行記録";
        document.querySelector(".detail-hero__image").style.display = "none";

        const form = document.createElement("form");
        form.classList.add("new-trip-form");
        
        const mainImageInput = document.createElement("input");
        mainImageInput.type = "file";
        mainImageInput.accept = "image/*";
        
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.name = "title";
        titleInput.placeholder = "旅行タイトル";

        const startDateInput =document.createElement("input");
        startDateInput.type = "date";

        const endDateInput =document.createElement("input");
        endDateInput.type = "date";

        const destinationInput =document.createElement("input");
        destinationInput.type = "text";
        destinationInput.placeholder ="旅行先";
        
        const memoInput =
        document.createElement("textarea");
        memoInput.placeholder ="ひとことメモ";

        const submitButton =document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent ="保存する";
        
        form.append(
            mainImageInput,
            titleInput,
            startDateInput,
            endDateInput,
            destinationInput,
            memoInput,
            submitButton
        );
        detailInfoContent.append(form);
    }
    renderTripForm();
}

   