/**
 * College Examination Seating Arrangement & Timetable System
 * Core logic supporting all academic years (1st, 2nd, 3rd, 4th Year),
 * admin schedule & classroom management, and student seating lookup.
 */

// Generate realistic students across 4 years and multiple branches
function generateDefaultStudents() {
  const branches = ['CSE', 'ECE', 'MECH', 'IT'];
  const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
                      'Diya', 'Saanvi', 'Ananya', 'Aadhya', 'Pari', 'Isha', 'Myra', 'Navya', 'Riya', 'Kavya'];
  const lastNames = ['Sharma', 'Verma', 'Reddy', 'Patel', 'Rao', 'Kumar', 'Singh', 'Nair', 'Mishra', 'Gupta'];

  const students = [];
  const yearConfigs = [
    { year: '1', prefix: '24', count: { CSE: 15, ECE: 15, MECH: 10, IT: 10 } },
    { year: '2', prefix: '23', count: { CSE: 15, ECE: 15, MECH: 10, IT: 10 } },
    { year: '3', prefix: '22', count: { CSE: 15, ECE: 15, MECH: 10, IT: 10 } },
    { year: '4', prefix: '21', count: { CSE: 15, ECE: 15, MECH: 10, IT: 10 } }
  ];

  let nameIndex = 0;
  yearConfigs.forEach(yc => {
    Object.keys(yc.count).forEach(br => {
      const num = yc.count[br];
      for (let i = 1; i <= num; i++) {
        const rollNum = `${yc.prefix}${br}${String(i).padStart(2, '0')}`;
        const fName = firstNames[(nameIndex + i) % firstNames.length];
        const lName = lastNames[(nameIndex * 3 + i) % lastNames.length];
        students.push({
          roll_no: rollNum,
          name: `${fName} ${lName}`,
          year: yc.year,
          branch: br
        });
      }
      nameIndex++;
    });
  });

  return students;
}

const DEFAULT_ROOMS = [
  { room_no: 'Hall 101', capacity: 40, benches: 20, block: 'Academic Block A' },
  { room_no: 'Hall 102', capacity: 40, benches: 20, block: 'Academic Block A' },
  { room_no: 'Hall 201', capacity: 30, benches: 15, block: 'Academic Block B' },
  { room_no: 'Hall 202', capacity: 30, benches: 15, block: 'Academic Block B' },
  { room_no: 'Seminar Hall 1', capacity: 60, benches: 30, block: 'Main Auditorium Block' }
];

const DEFAULT_EXAMS = [
  // 1st Year Exams
  { id: 'ex_1', year: '1', branch: 'CSE', subject: 'Linear Algebra & Calculus', subject_code: 'MAT101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_2', year: '1', branch: 'ECE', subject: 'Linear Algebra & Calculus', subject_code: 'MAT101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_3', year: '1', branch: 'MECH', subject: 'Engineering Physics', subject_code: 'PHY101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_4', year: '1', branch: 'IT', subject: 'Linear Algebra & Calculus', subject_code: 'MAT101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  
  // 2nd Year Exams
  { id: 'ex_5', year: '2', branch: 'CSE', subject: 'Data Structures & Algorithms', subject_code: 'CS201', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_6', year: '2', branch: 'ECE', subject: 'Digital Logic & Circuit Design', subject_code: 'EC201', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_7', year: '2', branch: 'MECH', subject: 'Fluid Mechanics & Thermodynamics', subject_code: 'ME201', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_8', year: '2', branch: 'IT', subject: 'Object Oriented Programming (Java)', subject_code: 'IT201', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },

  // 3rd Year Exams
  { id: 'ex_9', year: '3', branch: 'CSE', subject: 'Database Management Systems', subject_code: 'CS301', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_10', year: '3', branch: 'ECE', subject: 'Microprocessors & Microcontrollers', subject_code: 'EC301', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_11', year: '3', branch: 'MECH', subject: 'Design of Machine Elements', subject_code: 'ME301', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_12', year: '3', branch: 'IT', subject: 'Web Technologies & Cloud Services', subject_code: 'IT301', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },

  // 4th Year Exams
  { id: 'ex_13', year: '4', branch: 'CSE', subject: 'Artificial Intelligence & Deep Learning', subject_code: 'CS401', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_14', year: '4', branch: 'ECE', subject: 'VLSI Design & Embedded Systems', subject_code: 'EC401', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_15', year: '4', branch: 'MECH', subject: 'Refrigeration & Air Conditioning', subject_code: 'ME401', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_16', year: '4', branch: 'IT', subject: 'Information & Cyber Security', subject_code: 'IT401', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM)' },

  // Subsequent Exam Date (2026-10-18)
  { id: 'ex_17', year: '1', branch: 'CSE', subject: 'Basic Electrical Engineering', subject_code: 'EE101', exam_date: '2026-10-18', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_18', year: '2', branch: 'CSE', subject: 'Computer Organization & Architecture', subject_code: 'CS202', exam_date: '2026-10-18', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_19', year: '3', branch: 'CSE', subject: 'Compiler Design', subject_code: 'CS302', exam_date: '2026-10-18', session: 'Morning (09:30 AM - 12:30 PM)' },
  { id: 'ex_20', year: '4', branch: 'CSE', subject: 'Big Data Analytics', subject_code: 'CS402', exam_date: '2026-10-18', session: 'Morning (09:30 AM - 12:30 PM)' }
];

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123',
  name: 'Chief Examination Superintendent'
};

// Storage Initializer
function initCollegeData(force = false) {
  if (force || !localStorage.getItem('college_seating_v2')) {
    localStorage.setItem('cs_admin', JSON.stringify(DEFAULT_ADMIN));
    localStorage.setItem('cs_students', JSON.stringify(generateDefaultStudents()));
    localStorage.setItem('cs_rooms', JSON.stringify(DEFAULT_ROOMS));
    localStorage.setItem('cs_exams', JSON.stringify(DEFAULT_EXAMS));
    localStorage.setItem('college_seating_v2', 'true');
    // Pre-generate default seating for 2026-10-15 so students immediately see real seating!
    generateSeatingForDate('2026-10-15', 'Morning (09:30 AM - 12:30 PM)', ['all']);
  }
}
initCollegeData();

// Getters & Setters
function getStudents() {
  return JSON.parse(localStorage.getItem('cs_students') || '[]');
}

function saveStudents(data) {
  localStorage.setItem('cs_students', JSON.stringify(data));
}

function getRooms() {
  return JSON.parse(localStorage.getItem('cs_rooms') || '[]');
}

function saveRooms(data) {
  localStorage.setItem('cs_rooms', JSON.stringify(data));
}

function getExams() {
  return JSON.parse(localStorage.getItem('cs_exams') || '[]');
}

function saveExams(data) {
  localStorage.setItem('cs_exams', JSON.stringify(data));
}

function getAdmin() {
  return JSON.parse(localStorage.getItem('cs_admin') || JSON.stringify(DEFAULT_ADMIN));
}

function getAllSeatingPlans() {
  return JSON.parse(localStorage.getItem('cs_seating_plans') || '{}');
}

function saveSeatingPlan(key, plan) {
  const plans = getAllSeatingPlans();
  plans[key] = plan;
  localStorage.setItem('cs_seating_plans', JSON.stringify(plans));
}

// Authentication
function adminLogin(username, password) {
  const admin = getAdmin();
  if (username === admin.username && password === admin.password) {
    sessionStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
}

function isAdminLoggedIn() {
  return sessionStorage.getItem('admin_auth') === 'true';
}

function adminLogout() {
  sessionStorage.removeItem('admin_auth');
  window.location.href = 'exam_seating.html';
}

function checkAdminAuth() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'exam_seating.html';
  }
}

// Aliases
const login = adminLogin;
const isLoggedIn = isAdminLoggedIn;

// Utility: Format Date (YYYY-MM-DD -> DD-MM-YYYY)
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}

// Distinct Exam Dates
function getDistinctExamDates() {
  const exams = getExams();
  const dates = [...new Set(exams.map(e => e.exam_date))];
  return dates.sort();
}

// Distinct Sessions for a Date
function getSessionsForDate(date) {
  const exams = getExams().filter(e => e.exam_date === date);
  const sessions = [...new Set(exams.map(e => e.session))];
  return sessions;
}

/**
 * Advanced College Seating Generation Algorithm
 * Interleaves students across academic years and branches:
 * E.g., Bench Left = 1st Year CSE, Bench Right = 3rd Year CSE (or 2nd Year ECE)
 * Students seated on adjacent columns never write the same exam paper!
 */
function generateSeatingForDate(examDate, session, selectedYears = ['all']) {
  const allStudents = getStudents();
  const allExams = getExams().filter(e => e.exam_date === examDate && (!session || e.session === session));
  const rooms = getRooms().sort((a, b) => a.room_no.localeCompare(b.room_no));

  if (allExams.length === 0) {
    return { error: true, message: `No exams scheduled on ${examDate} for session ${session}` };
  }

  // Filter students who actually have an exam scheduled in this session
  const examSubjectsMap = {}; // key: `${year}_${branch}` -> subject object
  allExams.forEach(ex => {
    examSubjectsMap[`${ex.year}_${ex.branch}`] = ex;
  });

  let eligibleStudents = allStudents.filter(s => {
    if (!selectedYears.includes('all') && !selectedYears.includes(String(s.year))) {
      return false;
    }
    return Boolean(examSubjectsMap[`${s.year}_${s.branch}`]);
  });

  if (eligibleStudents.length === 0) {
    return { error: true, message: 'No eligible students found with scheduled exams for the selected criteria.' };
  }

  // Group eligible students by Group Key = `${year}-${branch}`
  const groupStudents = {};
  eligibleStudents.forEach(s => {
    const key = `Year ${s.year} - ${s.branch}`;
    if (!groupStudents[key]) groupStudents[key] = [];
    groupStudents[key].push(s);
  });

  // Sort each group's students by roll number
  Object.keys(groupStudents).forEach(k => {
    groupStudents[k].sort((a, b) => a.roll_no.localeCompare(b.roll_no));
  });

  const groupKeys = Object.keys(groupStudents);
  const roomAllocations = [];
  const studentSeatMap = {}; // roll_no -> allocation info
  let roomIdx = 0;

  function hasRemaining() {
    return groupKeys.some(k => groupStudents[k].length > 0);
  }

  while (hasRemaining() && roomIdx < rooms.length) {
    const currentRoom = rooms[roomIdx];
    const halfCap = Math.max(1, Math.floor(currentRoom.capacity / 2));

    // Select Group A (Left Column): pick the group with most students
    const availableGroups = groupKeys.filter(k => groupStudents[k].length > 0);
    availableGroups.sort((a, b) => groupStudents[b].length - groupStudents[a].length);
    const groupAKey = availableGroups[0];
    const studentsA = groupStudents[groupAKey].splice(0, halfCap);

    let leftSection = null;
    if (studentsA.length > 0) {
      const rollRange = `${studentsA[0].roll_no} - ${studentsA[studentsA.length - 1].roll_no}`;
      const examA = examSubjectsMap[`${studentsA[0].year}_${studentsA[0].branch}`];
      leftSection = {
        side: 'Left (Column A)',
        group: groupAKey,
        year: studentsA[0].year,
        branch: studentsA[0].branch,
        subject: examA ? examA.subject : 'N/A',
        subject_code: examA ? examA.subject_code : '',
        count: studentsA.length,
        roll_range: rollRange,
        students: studentsA
      };

      studentsA.forEach((st, idx) => {
        studentSeatMap[st.roll_no] = {
          name: st.name,
          roll_no: st.roll_no,
          year: st.year,
          branch: st.branch,
          room_no: currentRoom.room_no,
          block: currentRoom.block,
          column: 'Left (Column A)',
          bench_no: idx + 1,
          seat_no: `A-${idx + 1}`,
          exam_date: examDate,
          session: session,
          subject: examA ? examA.subject : 'N/A',
          subject_code: examA ? examA.subject_code : ''
        };
      });
    }

    // Select Group B (Right Column): pick a group with a DIFFERENT subject / year
    let groupBKey = null;
    const remainingGroups = groupKeys.filter(k => groupStudents[k].length > 0 && k !== groupAKey);
    if (remainingGroups.length > 0) {
      remainingGroups.sort((a, b) => groupStudents[b].length - groupStudents[a].length);
      groupBKey = remainingGroups[0];
    } else if (groupStudents[groupAKey] && groupStudents[groupAKey].length > 0) {
      // Fallback: if only one group remains in the entire institution
      groupBKey = groupAKey;
    }

    let rightSection = null;
    if (groupBKey && groupStudents[groupBKey].length > 0) {
      const studentsB = groupStudents[groupBKey].splice(0, halfCap);
      if (studentsB.length > 0) {
        const rollRange = `${studentsB[0].roll_no} - ${studentsB[studentsB.length - 1].roll_no}`;
        const examB = examSubjectsMap[`${studentsB[0].year}_${studentsB[0].branch}`];
        rightSection = {
          side: 'Right (Column B)',
          group: groupBKey,
          year: studentsB[0].year,
          branch: studentsB[0].branch,
          subject: examB ? examB.subject : 'N/A',
          subject_code: examB ? examB.subject_code : '',
          count: studentsB.length,
          roll_range: rollRange,
          students: studentsB
        };

        studentsB.forEach((st, idx) => {
          studentSeatMap[st.roll_no] = {
            name: st.name,
            roll_no: st.roll_no,
            year: st.year,
            branch: st.branch,
            room_no: currentRoom.room_no,
            block: currentRoom.block,
            column: 'Right (Column B)',
            bench_no: idx + 1,
            seat_no: `B-${idx + 1}`,
            exam_date: examDate,
            session: session,
            subject: examB ? examB.subject : 'N/A',
            subject_code: examB ? examB.subject_code : ''
          };
        });
      }
    }

    roomAllocations.push({
      room_no: currentRoom.room_no,
      block: currentRoom.block,
      total_capacity: currentRoom.capacity,
      allocated_count: (leftSection ? leftSection.count : 0) + (rightSection ? rightSection.count : 0),
      left: leftSection,
      right: rightSection
    });

    roomIdx++;
  }

  // Calculate unseated students if halls were insufficient
  const unseated = {};
  groupKeys.forEach(k => {
    if (groupStudents[k].length > 0) {
      unseated[k] = groupStudents[k].length;
    }
  });

  const planKey = `${examDate}_${session}`;
  const planResult = {
    plan_key: planKey,
    exam_date: examDate,
    formatted_date: formatDisplayDate(examDate),
    session: session,
    selected_years: selectedYears,
    total_students_scheduled: eligibleStudents.length,
    rooms_used: roomAllocations.length,
    room_allocations: roomAllocations,
    student_seat_map: studentSeatMap,
    unseated: unseated,
    generated_at: new Date().toLocaleString(),
    is_published: true
  };

  saveSeatingPlan(planKey, planResult);
  localStorage.setItem('cs_active_plan', planKey);

  return planResult;
}

// Student Lookup API
function lookupStudentSeating(rollNo) {
  const cleanRoll = rollNo.trim().toUpperCase();
  const allStudents = getStudents();
  const student = allStudents.find(s => s.roll_no.toUpperCase() === cleanRoll);

  if (!student) {
    return { found: false, message: `Student with Roll Number "${cleanRoll}" not found in records.` };
  }

  const plans = getAllSeatingPlans();
  const seatings = [];

  Object.values(plans).forEach(plan => {
    if (plan.student_seat_map && plan.student_seat_map[student.roll_no]) {
      seatings.push({
        ...plan.student_seat_map[student.roll_no],
        plan_date: plan.formatted_date || plan.exam_date
      });
    }
  });

  // Get student's exam timetable
  const exams = getExams().filter(e => String(e.year) === String(student.year) && e.branch === student.branch);

  return {
    found: true,
    student: student,
    seatings: seatings,
    timetable: exams
  };
}
