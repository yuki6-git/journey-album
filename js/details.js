//詳細を見るを押された時のIDに対応したdetailページの表示//
const params = new URLSearchParams(window.location.search);
const tripId = Number(params.get("id"));
console.log(tripId);
const mode = params.get("mode");
let currentTrip = null;

if (mode !== "new") {
  currentTrip = trips.find((trip) => {
    return trip.id === tripId;
  });
}

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

function renderTripForm(trip = null) {
    detailInfoContent.textContent = "";

    document.querySelector(".info-title").textContent = "新しい旅行記録";
    document.querySelector(".detail-hero__image").style.display = "none";
    //基本情報のタブ//
    //写真の入力欄の作成//
    const form = document.createElement("form");
    form.classList.add("new-trip-form");
        
    const mainImageField = document.createElement("div");
    mainImageField.classList.add("form-field");

    const mainImageLabel = document.createElement("label");
    mainImageLabel.htmlFor = "main-image";
    mainImageLabel.textContent = "メイン写真";

    const mainImageInput = document.createElement("input");
    mainImageInput.type = "file";
    mainImageInput.accept = "image/*";
    mainImageInput.id = "main-image";

    mainImageField.append(mainImageLabel, mainImageInput);

    if (trip) {
        const preview = document.createElement("img");
        preview.src = trip.mainImage;
        preview.alt = trip.title;
        preview.classList.add("trip-preview-image");
        form.append(preview);
    }
    //タイトル入力欄の作成//
    const titleField = document.createElement("div");
    titleField.classList.add("form-field");
    
    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "trip-title";
    titleLabel.textContent = "旅行タイトル";
    
    const titleInput = document.createElement("input");
    titleInput.id = "trip-title";
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.placeholder = "旅行タイトル";
    titleInput.value = trip ? trip.title : "";

    //出発日入力欄の作成//
    const startDateField = document.createElement("div");
    startDateField.classList.add("form-field");

    const startDateLabel = document.createElement("label");
    startDateLabel.htmlFor = "start-date";
    startDateLabel.textContent = "出発日";

    const startDateInput =document.createElement("input");
    startDateInput.id = "start-date";
    startDateInput.type = "date";
    startDateInput.value = trip ? trip.startDate : "";
    
    //帰宅日入力欄の作成//
    const endDateField = document.createElement("div");
    endDateField.classList.add("form-field");
    
    const endDateLabel = document.createElement("label");
    endDateLabel.htmlFor = "end-date";
    endDateLabel.textContent = "帰宅日";

    const endDateInput =document.createElement("input");
    endDateInput.id = "end-date";
    endDateInput.type = "date";
    endDateInput.value = trip ? trip.endDate : "";

    //旅行先の入力欄の作成//
    const destinationField = document.createElement("div");
    destinationField.classList.add("form-field");

    const destinationLabel = document.createElement("label");
    destinationLabel.htmlFor = "destination";
    destinationLabel.textContent = "旅行先";

    const destinationInput =document.createElement("input");
    destinationInput.id = "destination";
    destinationInput.type = "text";
    destinationInput.placeholder ="旅行先";
    destinationInput.value = trip ? trip.destination : "";

    //一言メモの入力欄の作成//
    const memoField = document.createElement("div");
    memoField.classList.add("form-field");
    
    const memoLabel = document.createElement("label");
    memoLabel.htmlFor = "memo";
    memoLabel.textContent = "一言メモ";

    const memoInput =
    document.createElement("textarea");
    memoInput.id = "memo";
    memoInput.placeholder ="一言メモ";
    memoInput.value = trip ? trip.text : "";

    const submitButton =document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent ="保存する";

    titleField.append(
        titleLabel, titleInput
    );
    startDateField.append(
        startDateLabel, startDateInput
    );
    endDateField.append(
        endDateLabel, endDateInput
    );
    destinationField.append(
        destinationLabel, destinationInput
    );
    memoField.append(
        memoLabel, memoInput
    );

    form.append(
        mainImageField,
        titleField,
        startDateField,
        endDateField,
        destinationField,
        memoField,
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
                    schedules: []
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

//写真の追加//
const photoInput = document.querySelector( ".photos__input");
const addPhotoButton = document.querySelector(".photos__add-button");
const photoGallery = document.querySelector(".photos__gallery");

addPhotoButton.addEventListener(
  "click", () => {
    photoInput.click();
});

function renderPhotos(trip) {
  photoGallery.textContent = "";

  trip.photos.forEach((photo) => {
    const img = document.createElement("img");
    img.classList.add("photos__image");
    img.src = photo;
    img.alt = `${trip.title}の写真`;

    photoGallery.append(img);
  });
}
//写真の表示//
photoInput.addEventListener("change", () => {
    const files = Array.from(photoInput.files);
    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            currentTrip.photos.push(reader.result);
            localStorage.setItem(
                "trips",
                JSON.stringify(trips)
            );
            renderPhotos(currentTrip);
        };
        reader.readAsDataURL(file);
    });
    renderPhotos(currentTrip);
});


//日程タブの表示//
const scheduleContainer = document.querySelector(".schedule__content");
function renderSchedule(trip) {
    scheduleContainer.textContent = "";
    const groupedSchedules = {};
    
    trip.schedules.forEach((schedule) => {
        if (!groupedSchedules[schedule.day]) {
            groupedSchedules[schedule.day] = [];
        }
        groupedSchedules[schedule.day].push(schedule);
    });

    Object.entries(groupedSchedules).forEach(([day, schedules]) => {
        const scheduleDay = document.createElement("div");
        scheduleDay.classList.add("schedule__day");

        const dayTitle = document.createElement("h3");
        dayTitle.classList.add("schedule__day-title");
        dayTitle.textContent = `${day}日目`;

        const scheduleList = document.createElement("ul");
        scheduleList.classList.add("schedule__list");
        
        schedules.sort((a, b) => {
            return a.time.localeCompare(b.time);
        });
        schedules.forEach((schedule) => {
            const listItem = document.createElement("li");
            listItem.classList.add("schedule__item");

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "削除"
            deleteButton.addEventListener("click", () => {
                if (!confirm("この予定を削除しますか？")) {
                    return;
                }
                currentTrip.schedules = currentTrip.schedules.filter((item) => {
                    return item.id !== schedule.id;
                });
                localStorage.setItem(
                    "trips",
                    JSON.stringify(trips)
                );
                renderSchedule(currentTrip);
            });

            const time = document.createElement("time");
            time.textContent = schedule.time;

            const memo = document.createElement("p");
            memo.textContent = schedule.memo;

            listItem.append(time, memo, deleteButton);
            scheduleList.append(listItem);
        });
        scheduleDay.append(dayTitle, scheduleList);
        scheduleContainer.append(scheduleDay);
    });    
}
renderSchedule(currentTrip);

//新規日程の作成//
const dayInput = document.querySelector(".schedule-day-input");
const timeInput = document.querySelector(".schedule-time-input");
const memoInput = document.querySelector(".schedule-memo-input");
const addScheduleButton = document.querySelector(".schedule-add-button");

//新規日程の作成//
addScheduleButton.addEventListener("click",() => {
    if (dayInput.value === "" ||
        timeInput.value === "" ||
        memoInput.value.trim() === ""
    ){
      alert(
        "必須項目を入力してください"
      );
      return;
    }
    
    const newSchedule = {
        id: Date.now(),
        day: dayInput.value,
        time: timeInput.value,
        memo: memoInput.value.trim(),
    };

    currentTrip.schedules.push(newSchedule);

    localStorage.setItem(
    "trips",
    JSON.stringify(trips)
    );

    renderSchedule(currentTrip);

    // フォームリセット
    dayInput.value = "";
    timeInput.value = "";
    memoInput.value = "";
});
