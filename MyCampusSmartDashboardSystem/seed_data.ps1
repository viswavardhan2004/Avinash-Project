$sections = @(
    @{ name="CSE-A"; branch="CSE"; year="4"; semester="7"; academicYear="2025-26"; classRoom="A-101"; maxCapacity=60 },
    @{ name="ECE-A"; branch="ECE"; year="3"; semester="5"; academicYear="2025-26"; classRoom="B-201"; maxCapacity=60 },
    @{ name="ME-A"; branch="ME"; year="2"; semester="3"; academicYear="2025-26"; classRoom="C-301"; maxCapacity=60 }
)

foreach ($s in $sections) {
    $body = $s | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:8080/api/sections" -Method Post -ContentType "application/json" -Body $body
}

$students = @(
    @{ name="Lara Croft"; rollNo="S002"; rfidUid="RFID002"; branch="CSE"; year=4; email="lara@avanthi.edu"; sectionName="CSE-A"; joiningYear=2022; passingYear=2026; password="password123" },
    @{ name="Nathan Drake"; rollNo="S003"; rfidUid="RFID003"; branch="CSE"; year=4; email="nathan@avanthi.edu"; sectionName="CSE-A"; joiningYear=2022; passingYear=2026; password="password123" },
    @{ name="Aloy Sobeck"; rollNo="S004"; rfidUid="RFID004"; branch="ECE"; year=3; email="aloy@avanthi.edu"; sectionName="ECE-A"; joiningYear=2023; passingYear=2027; password="password123" },
    @{ name="Joel Miller"; rollNo="S005"; rfidUid="RFID005"; branch="ME"; year=2; email="joel@avanthi.edu"; sectionName="ME-A"; joiningYear=2024; passingYear=2028; password="password123" },
    @{ name="Ellie Williams"; rollNo="S006"; rfidUid="RFID006"; branch="CSE"; year=1; email="ellie@avanthi.edu"; sectionName="CSE-A"; joiningYear=2025; passingYear=2029; password="password123" }
)

foreach ($st in $students) {
    $body = $st | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:8080/api/students" -Method Post -ContentType "application/json" -Body $body
}

$teachers = @(
    @{ name="Dr. Isaac Clarke"; employeeId="T001"; email="isaac@avanthi.edu"; department="CSE"; designation="Professor"; joiningDate="2020-01-15"; qualification="Ph.D in Computer Science"; password="password123" },
    @{ name="Dr. Sarah Connor"; employeeId="T002"; email="sarah@avanthi.edu"; department="ECE"; designation="Assistant Professor"; joiningDate="2021-08-20"; qualification="M.Tech in Electronics"; password="password123" },
    @{ name="Dr. Gordon Freeman"; employeeId="T003"; email="gordon@avanthi.edu"; department="ME"; designation="Senior Professor"; joiningDate="1998-05-10"; qualification="Ph.D in Physics"; password="password123" }
)

foreach ($t in $teachers) {
    $body = $t | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:8080/api/teachers" -Method Post -ContentType "application/json" -Body $body
}
