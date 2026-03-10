let selectedDay = "";
let selectedMonth = "";
let selectedYear = "";
let currentLang = "ar";

let ageOn = true;
let hijriOn = true;
let waterOn = false;
let sleepOn = false;
let mealsOn = false;
let ramadanOn = false;
let prayersOn = false;
let hoursOn = false;
let heartbeatOn = false;

const dayPicker = document.getElementById("dayPicker");
const monthPicker = document.getElementById("monthPicker");
const yearPicker = document.getElementById("yearPicker");

function openBirthSheet() {
  document.getElementById("birthSheet").style.display = "flex";
}

function closeBirthSheet() {
  document.getElementById("birthSheet").style.display = "none";
  clearDateError();
}

function clearDateError() {
  document.getElementById("dateError").innerText = "";
  dayPicker.classList.remove("error-field");
  monthPicker.classList.remove("error-field");
  yearPicker.classList.remove("error-field");
}

function markFieldError(field, message) {
  clearDateError();
  document.getElementById("dateError").innerText = message;
  field.classList.add("error-field");
}

function confirmBirthDate() {
  const errorBox = document.getElementById("dateError");
  clearDateError();

  selectedDay = dayPicker.value.trim();
  selectedMonth = monthPicker.value.trim();
  selectedYear = yearPicker.value.trim();

  if (!selectedDay || !selectedMonth || !selectedYear) {
    errorBox.innerText = currentLang === "ar"
      ? "يرجى إدخال اليوم والشهر والسنة"
      : "Please enter day, month, and year";
    return;
  }

  const d = Number(selectedDay);
  const m = Number(selectedMonth);
  const y = Number(selectedYear);
  const thisYear = new Date().getFullYear();

  if (isNaN(d) || d < 1 || d > 31) {
    markFieldError(
      dayPicker,
      currentLang === "ar" ? "اليوم يجب أن يكون بين 1 و 31" : "Day must be between 1 and 31"
    );
    return;
  }

  if (isNaN(m) || m < 1 || m > 12) {
    markFieldError(
      monthPicker,
      currentLang === "ar" ? "الشهر يجب أن يكون بين 1 و 12" : "Month must be between 1 and 12"
    );
    return;
  }

  if (isNaN(y) || y < 1900 || y > thisYear) {
    markFieldError(
      yearPicker,
      currentLang === "ar" ? "السنة غير صحيحة" : "Invalid year"
    );
    return;
  }

  const testDate = new Date(y, m - 1, d);

  if (
    testDate.getFullYear() !== y ||
    testDate.getMonth() !== m - 1 ||
    testDate.getDate() !== d
  ) {
    document.getElementById("dateError").innerText =
      currentLang === "ar" ? "تاريخ غير صحيح" : "Invalid date";
    dayPicker.classList.add("error-field");
    monthPicker.classList.add("error-field");
    yearPicker.classList.add("error-field");
    return;
  }

  document.getElementById("birthButton").innerText =
    currentLang === "ar" ? `${y}/${m}/${d}` : `${d}/${m}/${y}`;

  closeBirthSheet();
}

function toggleOption(type) {
  if (type === "age") {
    ageOn = !ageOn;
    document.getElementById("ageBtn").classList.toggle("active", ageOn);
  }
  if (type === "hijri") {
    hijriOn = !hijriOn;
    document.getElementById("hijriBtn").classList.toggle("active", hijriOn);
  }
  if (type === "water") {
    waterOn = !waterOn;
    document.getElementById("waterBtn").classList.toggle("active", waterOn);
  }
  if (type === "sleep") {
    sleepOn = !sleepOn;
    document.getElementById("sleepBtn").classList.toggle("active", sleepOn);
  }
  if (type === "meals") {
    mealsOn = !mealsOn;
    document.getElementById("mealsBtn").classList.toggle("active", mealsOn);
  }
  if (type === "ramadan") {
    ramadanOn = !ramadanOn;
    document.getElementById("ramadanBtn").classList.toggle("active", ramadanOn);
  }
  if (type === "prayers") {
    prayersOn = !prayersOn;
    document.getElementById("prayersBtn").classList.toggle("active", prayersOn);
  }
  if (type === "hours") {
    hoursOn = !hoursOn;
    document.getElementById("hoursBtn").classList.toggle("active", hoursOn);
  }
  if (type === "heartbeat") {
    heartbeatOn = !heartbeatOn;
    document.getElementById("heartbeatBtn").classList.toggle("active", heartbeatOn);
  }
}

function calculateAge() {
  const error = document.getElementById("error");
  error.innerText = "";

  const d = Number(selectedDay);
  const m = Number(selectedMonth);
  const y = Number(selectedYear);

  if (!selectedDay || !selectedMonth || !selectedYear) {
    error.innerText = currentLang === "ar"
      ? "يرجى اختيار تاريخ الميلاد"
      : "Please choose your birth date";
    return;
  }

  const birthDate = new Date(y, m - 1, d);
  const today = new Date();

  if (
    birthDate.getFullYear() !== y ||
    birthDate.getMonth() !== m - 1 ||
    birthDate.getDate() !== d
  ) {
    error.innerText = currentLang === "ar"
      ? "تاريخ الميلاد غير صحيح"
      : "Invalid birth date";
    return;
  }

  if (birthDate > today) {
    error.innerText = currentLang === "ar"
      ? "تاريخ الميلاد لا يمكن أن يكون في المستقبل"
      : "Birth date cannot be in the future";
    return;
  }

  const data = {
    selectedDay,
    selectedMonth,
    selectedYear,
    currentLang,
    ageOn,
    hijriOn,
    waterOn,
    sleepOn,
    mealsOn,
    ramadanOn,
    prayersOn,
    hoursOn,
    heartbeatOn,
    theme: document.body.classList.contains("light-mode") ? "light" : "dark"
  };

  localStorage.setItem("ageCalcData", JSON.stringify(data));
  window.location.href = "result.html";
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function toggleLanguage() {
  clearDateError();

  if (currentLang === "ar") {
    currentLang = "en";
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";

    document.getElementById("mainTitle").innerText = "Age Calculator";
    document.getElementById("mainDesc").innerText =
      "Choose your birth date, enable the calculations you want, then press calculate.";
    document.getElementById("birthButton").innerText = "Choose birth date";
    document.getElementById("optionsMainTitle").innerText = "Choose what you want to calculate";
    document.getElementById("labelAge").innerText = "Gregorian age";
    document.getElementById("labelHijri").innerText = "Hijri age";
    document.getElementById("labelWater").innerText = "Water amount";
    document.getElementById("labelSleep").innerText = "Sleep hours";
    document.getElementById("labelMeals").innerText = "Meals count";
    document.getElementById("labelRamadan").innerText = "How many Ramadans";
    document.getElementById("labelPrayers").innerText = "Prayers since age 7";
    document.getElementById("labelHours").innerText = "Lived hours";
    document.getElementById("labelHeartbeat").innerText = "Heart beats";
    document.getElementById("calcBtn").innerText = "Calculate";
    document.getElementById("sheetTitle").innerText = "Choose Birth Date";
    document.getElementById("dayLabel").innerText = "Day";
    document.getElementById("monthLabel").innerText = "Month";
    document.getElementById("yearLabel").innerText = "Year";
    document.getElementById("confirmBtn").innerText = "Confirm";
    document.getElementById("cancelBtn").innerText = "Cancel";
    document.getElementById("aboutLink").innerText = "About";
    document.getElementById("contactLink").innerText = "Contact";
    document.getElementById("privacyLink").innerText = "Privacy Policy";
  } else {
    currentLang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";

    document.getElementById("mainTitle").innerText = "حساب العمر";
    document.getElementById("mainDesc").innerText =
      "اختر تاريخ ميلادك ثم فعّل الحسابات التي تريدها، وبعدها اضغط على احسب.";
    document.getElementById("birthButton").innerText = "اختر تاريخ الميلاد";
    document.getElementById("optionsMainTitle").innerText = "اختر ما تريد حسابه";
    document.getElementById("labelAge").innerText = "العمر الميلادي";
    document.getElementById("labelHijri").innerText = "العمر الهجري";
    document.getElementById("labelWater").innerText = "كمية الماء";
    document.getElementById("labelSleep").innerText = "ساعات النوم";
    document.getElementById("labelMeals").innerText = "عدد الوجبات";
    document.getElementById("labelRamadan").innerText = "كم رمضان مر عليك";
    document.getElementById("labelPrayers").innerText = "كم صلاة صليت من عمر 7";
    document.getElementById("labelHours").innerText = "كم ساعة عشت";
    document.getElementById("labelHeartbeat").innerText = "كم نبضة قلب";
    document.getElementById("calcBtn").innerText = "احسب";
    document.getElementById("sheetTitle").innerText = "اختر الميلاد";
    document.getElementById("dayLabel").innerText = "اليوم";
    document.getElementById("monthLabel").innerText = "الشهر";
    document.getElementById("yearLabel").innerText = "السنة";
    document.getElementById("confirmBtn").innerText = "تأكيد";
    document.getElementById("cancelBtn").innerText = "إلغاء";
    document.getElementById("aboutLink").innerText = "من نحن";
    document.getElementById("contactLink").innerText = "اتصل بنا";
    document.getElementById("privacyLink").innerText = "سياسة الخصوصية";
  }
}
