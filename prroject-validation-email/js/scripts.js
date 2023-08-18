let outputLive = document.querySelector("#outputlive");
let outputBounce = document.querySelector("#outputbounce");
let emailTextArea = document.getElementById("emailTextArea");

document.getElementById("parseButton").addEventListener("click", function () {
  console.log(emailTextArea.value);
  document.querySelector("#dw-button").classList.add("d-none");
  document.getElementById("loadingbuttondw").classList.remove("d-none");
  let emails = emailTextArea.value.split("\n"); // Memisahkan email berdasarkan baris baru
  let printTotal = 0;
  // Membersihkan email dari spasi atau karakter kosong
  emails = emails.filter((email) => email.trim() !== "");
  emailTextArea.value = "";
  for (i = 0; i < emails.length; i++) {
    let url = `http://api.eva.pingutil.com/email?email=${emails[i]}`;
    let statusEmail;
    // Menggunakan fetch untuk mengambil data dari API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Data JSON sudah diuraikan dan dapat diakses di sini
        let webmail = data.data.webmail;
        let devirable = data.data.deliverable;
        let emalAddress = data.data.email_address;

        if (webmail == true && devirable == true) {
          statusEmail = "Live";
        } else {
          statusEmail = "Dead";
        }

        // Menampilkan nilai yang diakses
        if (statusEmail === "Live") {
          outputLive.value += `${emalAddress} : ${statusEmail}` + "\n";
          printTotal++;
        } else if (statusEmail === "Dead") {
          outputBounce.value += `${emalAddress} : ${statusEmail}` + "\n";
          printTotal++;
        } else {
          emails.value += `${emalAddress} : ${statusEmail}` + "\n";
          printTotal++;
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }
  setTimeout(function () {
    location.reload();
    document.querySelector("#dw-button").classList.remove("d-none");
    document.getElementById("loadingbuttondw").classList.add("d-none");
  }, `${i}000`);
});

// live&bounce dw
let dwButton = document.querySelector("#dw-button");
let livedownload = outputLive.value;
let Bouncedownload = outputBounce.value;

dwButton.addEventListener("click", function () {
  downloadTextFileLive(livedownload, "live.txt");
  downloadTextFileBounce(Bouncedownload, "bounce.txt");
});

function downloadTextFileLive(content, filename) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
function downloadTextFileBounce(content, filename) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
