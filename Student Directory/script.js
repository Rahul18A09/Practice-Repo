$(document).ready(function () {
  loadStudents();
  async function loadStudents() {
    $("#studentList").html(
      '<div class="col-12 text-center"><h5 class="text-white">Loading...</h5></div>'
    );

    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      renderStudents(data.users || []);
    } catch (err) {
      $("#studentList").html(`
           <div class="col-12">
           <div class="alert alert-danger">Failed to load Student</div>
           </div>`);
    }
  }

  // Render student cards

  function renderStudents(students) {
    $("#studentList").empty();

    students.forEach((student) => {
      $("#studentList").append(`<div class="col-sm-6 col-md-4">
                                  <div class="card student-card h-100 p-3 bg-primary">
                                  <div class="card-body bg-white rounded">
                                  <h5 class="card-title">${student.firstName} ${student.lastName}</h5>
                                  <p class="card-text text-muted small mb-0">${student.email}</p>
                                                          </div>
                                                    </div>
                                             </div>
                                        `);
    });
  }


  // Search filter
  $("#searchInput").on("keyup", function () {
    const q = $(this).val().toLowerCase();

    $("#studentList .col-sm-6").each(function () {
      const text = $(this).text().toLowerCase();
      $(this).toggle(text.includes(q));
    });
  });

  //   Clear search
  $("#clearSearch").click(function () {
    $("#searchInput").val("").trigger("keyup");
  });
});
