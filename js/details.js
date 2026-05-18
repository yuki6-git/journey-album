//詳細を見るを押された時のIDに対応したdetailページの表示//
const params = new URLSearchParams(window.location.search);
const tripId = Number(params.get("id"));
console.log(tripId);
const currentTrip = trips.find((trip) => {return trip.id === tripId});

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
function renderTripForm(trip = null) {
    detailInfoContent.textContent = "";

    document.querySelector(".info-title").textContent = "新しい旅行記録";
    document.querySelector(".detail-hero__image").style.display = "none";

    const form = document.createElement("form");
    form.classList.add("new-trip-form");
        
    const mainImageInput = document.createElement("input");
    mainImageInput.type = "file";
    mainImageInput.accept = "image/*";
    if (trip) {
        const preview = document.createElement("img");
        preview.src = trip.mainImage;
        preview.alt = trip.title;
        preview.classList.add("trip-preview-image");
        form.append(preview);
    }
    
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.placeholder = "旅行タイトル";
    titleInput.value = trip ? trip.title : "";

    const startDateInput =document.createElement("input");
    startDateInput.type = "date";
    startDateInput.value = trip ? trip.startDate : "";

    const endDateInput =document.createElement("input");
    endDateInput.type = "date";
    endDateInput.value = trip ? trip.endDate : "";

    const destinationInput =document.createElement("input");
    destinationInput.type = "text";
    destinationInput.placeholder ="旅行先";
    destinationInput.value = trip ? trip.destination : "";
        
    const memoInput =
    document.createElement("textarea");
    memoInput.placeholder ="一言メモ";
    memoInput.value = trip ? trip.text : "";

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

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const errors = [];
        if (!trip && !mainImageInput.files[0]) {
            errors.push("写真を選択してください");
        }
        if (titleInput.value.trim() === "") {
            errors.push("旅行タイトルを入力してください");
        }
        if (destinationInput.value.trim() === "") {
            errors.push("旅行先を入力してください");    
        }
        if (startDateInput.value === "") {
            errors.push("開始日を入力してください");
        }
        if (endDateInput.value === "") {
            errors.push("終了日を入力してください");
        }
        if (endDateInput.value < startDateInput.value) {
            errors.push("終了日は開始日より後の日付にしてください");
        }
            
        if (errors.length > 0) {
                alert(errors.join("\n"));
                return;
        }
        
        const saveTrip = (mainImage) => {
            if (trip) {
                trip.title = titleInput.value.trim();
                trip.destination = destinationInput.value.trim();
                trip.startDate = startDateInput.value;
                trip.endDate = endDateInput.value;
                trip.text = memoInput.value.trim();
                trip.mainImage = mainImage;
            } else {
                const newTrip = {
                    id: Date.now(),
                    title: titleInput.value.trim(),
                    destination: destinationInput.value.trim(),
                    startDate: startDateInput.value,
                    endDate: endDateInput.value,
                    text: memoInput.value.trim(),
                    mainImage: mainImage,
                    photos: [],
                };
                trips.push(newTrip);
            }
            localStorage.setItem("trips", JSON.stringify(trips));
            alert("旅行記録が保存されました");
            window.location.href = "./trips.html";
        };

        if (mainImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                saveTrip(reader.result);
            };
            reader.readAsDataURL(mainImageInput.files[0]);
        } else {
            saveTrip(trip.mainImage);
        }
    });
}    

if (mode === "new") {
    renderTripForm();
} else if (mode === "edit") {
    renderTripForm(currentTrip) 
} else {
    const titles = document.querySelectorAll(".info-title");
    titles.forEach((title) => {
    title.textContent = currentTrip.title;
    });
    document.querySelector(".detail-hero__image").src = currentTrip.mainImage;
    document.querySelector(".detail-hero__image").alt = currentTrip.title;
    renderDetail(currentTrip);
}
