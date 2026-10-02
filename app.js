/**
 * Exam Seating Arrangement - Core Application Logic
 * Supports running 100% in-browser without any server or database installation.
 */

const DEFAULT_DATA = {
  admin: {
    username: 'admin',
    password: 'admin123'
  },
  students: [
    { roll_no: '21CS01', branch: 'CSE', year: '1' },
    { roll_no: '21CS02', branch: 'CSE', year: '1' },
    { roll_no: '21CS03', branch: 'CSE', year: '1' },
    { roll_no: '21CS04', branch: 'CSE', year: '1' },
    { roll_no: '21CS05', branch: 'CSE', year: '1' },
    { roll_no: '21CS06', branch: 'CSE', year: '1' },
    { roll_no: '21CS07', branch: 'CSE', year: '1' },
    { roll_no: '21CS08', branch: 'CSE', year: '1' },
    { roll_no: '21CS09', branch: 'CSE', year: '1' },
    { roll_no: '21CS10', branch: 'CSE', year: '1' },
    { roll_no: '21EC01', branch: 'ECE', year: '1' },
    { roll_no: '21EC02', branch: 'ECE', year: '1' },
    { roll_no: '21EC03', branch: 'ECE', year: '1' },
    { roll_no: '21EC04', branch: 'ECE', year: '1' },
    { roll_no: '21EC05', branch: 'ECE', year: '1' },
    { roll_no: '21EC06', branch: 'ECE', year: '1' },
    { roll_no: '21EC07', branch: 'ECE', year: '1' },
    { roll_no: '21EC08', branch: 'ECE', year: '1' },
    { roll_no: '21EC09', branch: 'ECE', year: '1' },
    { roll_no: '21EC10', branch: 'ECE', year: '1' },
    { roll_no: '21ME01', branch: 'MECH', year: '1' },
    { roll_no: '21ME02', branch: 'MECH', year: '1' },
    { roll_no: '21ME03', branch: 'MECH', year: '1' },
    { roll_no: '21ME04', branch: 'MECH', year: '1' },
    { roll_no: '21ME05', branch: 'MECH', year: '1' },
    { roll_no: '21ME06', branch: 'MECH', year: '1' },
    { roll_no: '22CS01', branch: 'CSE', year: '2' },
    { roll_no: '22CS02', branch: 'CSE', year: '2' },
    { roll_no: '22CS03', branch: 'CSE', year: '2' },
    { roll_no: '22EC01', branch: 'ECE', year: '2' },
    { roll_no: '22EC02', branch: 'ECE', year: '2' },
    { roll_no: '22EC03', branch: 'ECE', year: '2' }
  ],
  exams: [
    { year: '1', branch: 'CSE', subject: 'Data Structures & Algorithms', exam_date: '2026-10-15' },
    { year: '1', branch: 'ECE', subject: 'Digital Electronics', exam_date: '2026-10-15' },
    { year: '1', branch: 'MECH', subject: 'Thermodynamics', exam_date: '2026-10-15' },
    { year: '1', branch: 'CSE', subject: 'Discrete Mathematics', exam_date: '2026-10-18' },
    { year: '1', branch: 'ECE', subject: 'Signals and Systems', exam_date: '2026-10-18' },
    { year: '2', branch: 'CSE', subject: 'Operating Systems', exam_date: '2026-10-20' },
    { year: '2', branch: 'ECE', subject: 'Microprocessors', exam_date: '2026-10-20' }
  ],
  rooms: [
    { room_no: 'LH-101', capacity: 30, year: '1' },
    { room_no: 'LH-102', capacity: 30, year: '1' },
    { room_no: 'LH-201', capacity: 20, year: '2' }
  ]
};

// Initialize Storage
function initStorage() {
  if (!localStorage.getItem('seating_app_initialized')) {
    localStorage.setItem('seating_admin', JSON.stringify(DEFAULT_DATA.admin));
    localStorage.setItem('seating_students', JSON.stringify(DEFAULT_DATA.students));
    localStorage.setItem('seating_exams', JSON.stringify(DEFAULT_DATA.exams));
    localStorage.setItem('seating_rooms', JSON.stringify(DEFAULT_DATA.rooms));
    localStorage.setItem('seating_app_initialized', 'true');
  }
}
initStorage();

// Storage Getters
function getStudents() {
  return JSON.parse(localStorage.getItem('seating_students') || '[]');
}

function getExams() {
  return JSON.parse(localStorage.getItem('seating_exams') || '[]');
}

function getRooms() {
  return JSON.parse(localStorage.getItem('seating_rooms') || '[]');
}

function getAdmin() {
  return JSON.parse(localStorage.getItem('seating_admin') || JSON.stringify(DEFAULT_DATA.admin));
}

function resetData() {
  localStorage.setItem('seating_admin', JSON.stringify(DEFAULT_DATA.admin));
  localStorage.setItem('seating_students', JSON.stringify(DEFAULT_DATA.students));
  localStorage.setItem('seating_exams', JSON.stringify(DEFAULT_DATA.exams));
  localStorage.setItem('seating_rooms', JSON.stringify(DEFAULT_DATA.rooms));
  localStorage.removeItem('seating_last_result');
}

// Authentication Helpers
function login(username, password) {
  const admin = getAdmin();
  if (username === admin.username && password === admin.password) {
    sessionStorage.setItem('admin_logged_in', 'true');
    return true;
  }
  return false;
}

function isLoggedIn() {
  return sessionStorage.getItem('admin_logged_in') === 'true';
}

function logout() {
  sessionStorage.removeItem('admin_logged_in');
  window.location.href = 'exam_seating.html';
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'exam_seating.html';
  }
}

// Get Exam Dates for a specific year
function getExamDatesForYear(year) {
  const exams = getExams().filter(e => String(e.year) === String(year));
  const uniqueDates = [...new Set(exams.map(e => e.exam_date))];
  return uniqueDates.sort();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}

// Core Seating Allocation Algorithm (Faithful translation of PHP algorithm)
function generateSeatingPlan(year, examDate) {
  const allStudents = getStudents().filter(s => String(s.year) === String(year));
  const allExams = getExams().filter(e => String(e.year) === String(year) && e.exam_date === examDate);
  const allRooms = getRooms().filter(r => String(r.year) === String(year)).sort((a, b) => a.room_no.localeCompare(b.room_no));

  if (allStudents.length === 0) {
    return { error: 'no_students', message: `No students registered for Year ${year}.` };
  }
  if (allRooms.length === 0) {
    return { error: 'no_rooms', message: `No examination rooms configured for Year ${year}.` };
  }

  // Group student roll numbers by branch
  const studentsByBranch = {};
  allStudents.sort((a, b) => a.branch.localeCompare(b.branch) || a.roll_no.localeCompare(b.roll_no));
  for (const s of allStudents) {
    if (!studentsByBranch[s.branch]) {
      studentsByBranch[s.branch] = [];
    }
    studentsByBranch[s.branch].push(s.roll_no);
  }

  const branches = Object.keys(studentsByBranch);
  const branchSubjects = {};
  for (const e of allExams) {
    branchSubjects[e.branch] = e.subject;
  }

  const seating = [];
  let roomIndex = 0;

  function hasRemainingStudents() {
    return Object.values(studentsByBranch).some(arr => arr.length > 0);
  }

  while (hasRemainingStudents() && roomIndex < allRooms.length) {
    const room = allRooms[roomIndex];
    const halfCapacity = Math.max(1, Math.floor(room.capacity / 2));

    // ----- LEFT SIDE -----
    const activeBranches = branches.filter(b => studentsByBranch[b] && studentsByBranch[b].length > 0);
    const branchA = activeBranches[0];
    let rollsA = [];
    let leftFilled = false;

    if (branchA) {
      rollsA = studentsByBranch[branchA].splice(0, halfCapacity);
      if (rollsA.length > 0) {
        seating.push({
          branch: branchA,
          roll_range: `${rollsA[0]} - ${rollsA[rollsA.length - 1]}`,
          room_no: room.room_no,
          capacity: rollsA.length,
          column_side: 'Left'
        });
        leftFilled = true;
      }
    }

    // ----- RIGHT SIDE -----
    const subA = branchSubjects[branchA] || '';
    let branchB = null;

    // Pick branch with different subject
    for (const b of branches) {
      if (studentsByBranch[b] && studentsByBranch[b].length > 0 && branchSubjects[b] !== subA && b !== branchA) {
        branchB = b;
        break;
      }
    }

    // Fallback: pick any other available branch
    if (!branchB) {
      for (const b of branches) {
        if (studentsByBranch[b] && studentsByBranch[b].length > 0 && b !== branchA) {
          branchB = b;
          break;
        }
      }
    }

    let rightFilled = false;
    if (branchB) {
      const rollsB = studentsByBranch[branchB].splice(0, halfCapacity);
      if (rollsB.length > 0) {
        seating.push({
          branch: branchB,
          roll_range: `${rollsB[0]} - ${rollsB[rollsB.length - 1]}`,
          room_no: room.room_no,
          capacity: rollsB.length,
          column_side: 'Right'
        });
        rightFilled = true;
      }
    }

    if (!leftFilled && !rightFilled) {
      roomIndex++;
      continue;
    }

    roomIndex++;
  }

  // Count unseated students
  const remaining = {};
  for (const b of branches) {
    if (studentsByBranch[b] && studentsByBranch[b].length > 0) {
      remaining[b] = studentsByBranch[b].length;
    }
  }

  const result = {
    year: year,
    exam_date: examDate,
    formatted_date: formatDate(examDate),
    seating: seating,
    remaining: remaining
  };

  localStorage.setItem('seating_last_result', JSON.stringify(result));
  return result;
}
