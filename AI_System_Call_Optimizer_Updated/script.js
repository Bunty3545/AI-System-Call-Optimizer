// function uploadFile() {
//     let fileInput = document.getElementById("fileInput");
//     let formData = new FormData();
//     formData.append("file", fileInput.files[0]);

//     fetch("upload.php", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert(data);
//         loadSystemCalls();
//     })
//     .catch(error => console.error("Error:", error));
// }

// function loadSystemCalls() {
//     fetch("fetch_data.php")
//     .then(response => response.json())
//     .then(data => {
//         let tableBody = document.getElementById("systemCallsTable");
//         tableBody.innerHTML = "";
        
//         data.forEach(row => {
//             let rowHTML = `<tr>
//                 <td class="border p-2">${row.call_name}</td>
//                 <td class="border p-2">${row.call_count}</td>
//                 <td class="border p-2">${row.execution_time}s</td>
//             </tr>`;
//             tableBody.innerHTML += rowHTML;
//         });
//     })
//     .catch(error => console.error("Error:", error));
// }

// document.addEventListener("DOMContentLoaded", loadSystemCalls);







// document.getElementById("fileInput").addEventListener("change", function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const data = e.target.result;
//             uploadFile(data);
//         };
//         reader.readAsText(file);
//     }
// });

// function uploadFile(data) {
//     document.getElementById("uploadProgress").classList.remove("hidden");
//     let progressBar = document.getElementById("progressBar");
//     progressBar.style.width = "50%";
//     progressBar.textContent = "Uploading...";

//     fetch("backend.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: "data=" + encodeURIComponent(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         progressBar.style.width = "100%";
//         progressBar.textContent = "Upload Complete!";
        
//         let tableBody = document.getElementById("systemCallsTable");
//         tableBody.innerHTML = ""; 

//         result.calls.forEach((call, index) => {
//             let row = `<tr>
//                 <td class="border p-2">${call}</td>
//                 <td class="border p-2">${result.counts[index]}</td>
//                 <td class="border p-2">${result.times[index]} sec</td>
//             </tr>`;
//             tableBody.innerHTML += row;
//         });
//     });
// }











    document.getElementById("fileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById("uploadProgress").classList.remove("hidden");
            let progressBar = document.getElementById("progressBar");
            progressBar.style.width = "20%";
            progressBar.textContent = "Reading file...";

            const reader = new FileReader();
            reader.onload = function(e) {
                const data = e.target.result;
                uploadFile(data);
            };
            
            reader.readAsText(file);
        }
    });

    function uploadFile(data) {
        let startTime = performance.now(); // Start execution time

        let progressBar = document.getElementById("progressBar");
        progressBar.style.width = "50%";
        progressBar.textContent = "Uploading...";

        fetch("backend.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "data=" + encodeURIComponent(data)
        })
        .then(response => response.json())
        .then(result => {
            let endTime = performance.now(); // End execution time
            let executionTime = (endTime - startTime).toFixed(2);

            progressBar.style.width = "100%";
            progressBar.textContent = "Upload Complete!";

            document.getElementById("executionTime").innerText = `Execution Time: ${executionTime} ms`;

            let tableBody = document.getElementById("systemCallsTable");
            tableBody.innerHTML = ""; 

            result.calls.forEach((call, index) => {
                let row = `<tr>
                    <td class="border p-2">${call}</td>
                    <td class="border p-2">${result.counts[index]}</td>
                    <td class="border p-2">${result.times[index]} sec</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        });
    }

