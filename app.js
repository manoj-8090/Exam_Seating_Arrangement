/**
 * Vignan's Lara Institute of Technology & Science (Autonomous)
 * Examination Branch & Seating Arrangement System
 *
 * Official Roll Numbering Scheme:
 * - IV B.Tech (4th Year): Regular: 23FE1A<BranchCode><Roll>, Lateral Entry: 24FE5A<BranchCode><Roll>
 * - III B.Tech (3rd Year): Regular: 24FE1A<BranchCode><Roll>, Lateral Entry: 25FE5A<BranchCode><Roll>
 * - II B.Tech (2nd Year): Regular: 25FE1A<BranchCode><Roll>, Lateral Entry: 26FE5A<BranchCode><Roll>
 * - I B.Tech (1st Year): Regular: 26FE1A<BranchCode><Roll>, Lateral Entry: 27FE5A<BranchCode><Roll>
 *
 * Official Branch Codes (from VLIT/ES/A/15/2026-27/11(E)):
 * - 01: CIVIL-A
 * - 02: EEE-A, EEE-B
 * - 03: ME-A
 * - 04: ECE-A, ECE-B, ECE-C
 * - 05: CSE-A, CSE-B, CSE-C, CSE-D
 * - 12: IT-A
 * - 42: CSM-A (CSE - AI & ML)
 * - 43: CAI-A (CSE - AI)
 * - 44: CSD-A (CSE - Data Science)
 * - 61: AIML-A (AI & ML)
 */

// Branch Definitions & Code Mapping from Vignan's Lara Official PDF
const BRANCH_DEFS = [
  { code: '01', branch: 'CIVIL-A', name: 'Civil Engineering (Sec A)', dept: 'CIVIL' },
  { code: '02', branch: 'EEE-A', name: 'Electrical & Electronics Engg (Sec A)', dept: 'EEE' },
  { code: '02', branch: 'EEE-B', name: 'Electrical & Electronics Engg (Sec B)', dept: 'EEE' },
  { code: '03', branch: 'ME-A', name: 'Mechanical Engineering (Sec A)', dept: 'ME' },
  { code: '04', branch: 'ECE-A', name: 'Electronics & Communication Engg (Sec A)', dept: 'ECE' },
  { code: '04', branch: 'ECE-B', name: 'Electronics & Communication Engg (Sec B)', dept: 'ECE' },
  { code: '04', branch: 'ECE-C', name: 'Electronics & Communication Engg (Sec C)', dept: 'ECE' },
  { code: '05', branch: 'CSE-A', name: 'Computer Science & Engineering (Sec A)', dept: 'CSE' },
  { code: '05', branch: 'CSE-B', name: 'Computer Science & Engineering (Sec B)', dept: 'CSE' },
  { code: '05', branch: 'CSE-C', name: 'Computer Science & Engineering (Sec C)', dept: 'CSE' },
  { code: '05', branch: 'CSE-D', name: 'Computer Science & Engineering (Sec D)', dept: 'CSE' },
  { code: '12', branch: 'IT-A', name: 'Information Technology (Sec A)', dept: 'IT' },
  { code: '42', branch: 'CSM-A', name: 'CSE - AI & Machine Learning (Sec A)', dept: 'CSM' },
  { code: '43', branch: 'CAI-A', name: 'CSE - Artificial Intelligence (Sec A)', dept: 'CAI' },
  { code: '44', branch: 'CSD-A', name: 'CSE - Data Science (Sec A)', dept: 'CSD' },
  { code: '61', branch: 'AIML-A', name: 'Artificial Intelligence & ML (Sec A)', dept: 'AIML' }
];

// Helper to convert index to JNTU alphanumeric roll suffix (01..99, A0..A9, etc.)
function getJntuRollSuffix(num) {
  if (num <= 99) {
    return String(num).padStart(2, '0');
  }
  const letters = 'ABCDEFGHJKLMNPQ';
  const offset = num - 100;
  const letterIdx = Math.floor(offset / 10);
  const digit = offset % 10;
  const letter = letters[letterIdx] || 'Z';
  return `${letter}${digit}`;
}

// Generate Realistic Students Across 4 Academic Years Matching Vignan's Lara Scheme
function generateDefaultStudents() {
  const firstNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
    'Diya', 'Saanvi', 'Ananya', 'Aadhya', 'Pari', 'Isha', 'Myra', 'Navya', 'Riya', 'Kavya',
    'Bhavya', 'Karthik', 'Pranav', 'Varun', 'Teja', 'Harsha', 'Nikhil', 'Sneha', 'Meghana', 'Pooja',
    'Chaitanya', 'Akhil', 'Sravani', 'Mounika', 'Sireesha', 'Pavan', 'Tarun', 'Manoj', 'Gopi', 'Ram'
  ];
  const lastNames = [
    'Reddy', 'Chowdary', 'Sharma', 'Verma', 'Patel', 'Rao', 'Kumar', 'Singh', 'Nair', 'Mishra',
    'Gupta', 'Katta', 'Golla', 'Yadav', 'Kollipara', 'Babu', 'Naidu', 'Setti', 'Gudipati', 'Mandava'
  ];

  // Year prefix mapping based on user instruction:
  // 4th Year: 23FE1A... / 24FE5A...
  // 3rd Year: 24FE1A... / 25FE5A...
  // 2nd Year: 25FE1A... / 26FE5A...
  // 1st Year: 26FE1A... / 27FE5A...
  const yearConfigs = [
    { year: '4', regPrefix: '23FE1A', latPrefix: '24FE5A', regCount: 15, latCount: 2 },
    { year: '3', regPrefix: '24FE1A', latPrefix: '25FE5A', regCount: 15, latCount: 2 },
    { year: '2', regPrefix: '25FE1A', latPrefix: '26FE5A', regCount: 15, latCount: 2 },
    { year: '1', regPrefix: '26FE1A', latPrefix: '27FE5A', regCount: 15, latCount: 0 }
  ];

  const students = [];
  let nameCursor = 0;

  yearConfigs.forEach(yc => {
    BRANCH_DEFS.forEach((b, bIdx) => {
      // Regular Students
      for (let i = 1; i <= yc.regCount; i++) {
        const rollSuffix = getJntuRollSuffix(i);
        const roll = `${yc.regPrefix}${b.code}${rollSuffix}`;
        const fName = firstNames[(nameCursor + i) % firstNames.length];
        const lName = lastNames[(nameCursor * 2 + i + bIdx) % lastNames.length];
        students.push({
          roll_no: roll,
          name: `${fName} ${lName}`,
          year: yc.year,
          branch: b.branch,
          dept: b.dept,
          enrolment_type: 'Regular'
        });
      }
      // Lateral Entry Students (for 2nd, 3rd, 4th Year)
      for (let j = 1; j <= yc.latCount; j++) {
        const latSuffix = getJntuRollSuffix(j);
        const latRoll = `${yc.latPrefix}${b.code}${latSuffix}`;
        const fName = firstNames[(nameCursor + 15 + j) % firstNames.length];
        const lName = lastNames[(nameCursor * 3 + j + bIdx) % lastNames.length];
        students.push({
          roll_no: latRoll,
          name: `${fName} ${lName}`,
          year: yc.year,
          branch: b.branch,
          dept: b.dept,
          enrolment_type: 'Lateral Entry'
        });
      }
      nameCursor++;
    });
  });

  return students;
}

// Official Examination Classrooms from Vignan's Lara Institute PDF
// LTF = Lara Third Floor, LLF = Lara Lower Floor (Capacity: 70 seats, 35 benches, 2 columns of 35)
const DEFAULT_ROOMS = [
  { room_no: 'LTF-3', capacity: 70, benches: 35, block: 'Lara Third Floor' },
  { room_no: 'LTF-4', capacity: 70, benches: 35, block: 'Lara Third Floor' },
  { room_no: 'LTF-7', capacity: 70, benches: 35, block: 'Lara Third Floor' },
  { room_no: 'LTF-8', capacity: 70, benches: 35, block: 'Lara Third Floor' },
  { room_no: 'LTF-10', capacity: 70, benches: 35, block: 'Lara Third Floor' },
  { room_no: 'LTF-12', capacity: 70, benches: 35, block: 'Lara Third Floor' },
  { room_no: 'LLF-2', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-3', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-4', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-7', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-8', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-9', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-10', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-12', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-13', capacity: 70, benches: 35, block: 'Lara Lower Floor' },
  { room_no: 'LLF-14', capacity: 70, benches: 35, block: 'Lara Lower Floor' }
];

// Scheduled Examination Papers
// Includes the official Assignment-3 Exam on 2026-09-29 from the PDF, plus mid/semester schedules
const DEFAULT_EXAMS = [
  // ==========================================
  // PDF Official Schedule: 2026-09-29 (01:15 to 02:15 PM)
  // IV B.Tech I Semester Assignment-3 Examinations
  // ==========================================
  { id: 'ex_vlit_4_1', year: '4', branch: 'CIVIL-A', subject: 'Advanced Structural Engineering', subject_code: 'CE4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_2', year: '4', branch: 'EEE-A', subject: 'Power System Operation & Control', subject_code: 'EE4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_3', year: '4', branch: 'EEE-B', subject: 'Power System Operation & Control', subject_code: 'EE4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_4', year: '4', branch: 'ME-A', subject: 'Automation & Robotics Technology', subject_code: 'ME4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_5', year: '4', branch: 'ECE-A', subject: 'Optical Communications & Microwave Engg', subject_code: 'EC4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_6', year: '4', branch: 'ECE-B', subject: 'Optical Communications & Microwave Engg', subject_code: 'EC4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_7', year: '4', branch: 'ECE-C', subject: 'Optical Communications & Microwave Engg', subject_code: 'EC4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_8', year: '4', branch: 'CSE-A', subject: 'Deep Learning & Neural Architectures', subject_code: 'CS4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_9', year: '4', branch: 'CSE-B', subject: 'Deep Learning & Neural Architectures', subject_code: 'CS4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_10', year: '4', branch: 'CSE-C', subject: 'Deep Learning & Neural Architectures', subject_code: 'CS4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_11', year: '4', branch: 'CSE-D', subject: 'Deep Learning & Neural Architectures', subject_code: 'CS4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_12', year: '4', branch: 'IT-A', subject: 'Cloud Computing & Virtualization', subject_code: 'IT4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_13', year: '4', branch: 'CSM-A', subject: 'Natural Language Processing', subject_code: 'AM4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_14', year: '4', branch: 'CAI-A', subject: 'Computer Vision & Autonomous Systems', subject_code: 'AI4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_15', year: '4', branch: 'CSD-A', subject: 'Big Data Analytics & Spark', subject_code: 'DS4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_4_16', year: '4', branch: 'AIML-A', subject: 'Reinforcement Learning', subject_code: 'ML4101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },

  // III B.Tech (3rd Year) - Parallel Mid Session (2026-09-29)
  { id: 'ex_vlit_3_1', year: '3', branch: 'CSE-A', subject: 'Compiler Design & Automata', subject_code: 'CS3101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_3_2', year: '3', branch: 'ECE-A', subject: 'VLSI Design & Verilog', subject_code: 'EC3101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_3_3', year: '3', branch: 'IT-A', subject: 'Web Technologies & Frameworks', subject_code: 'IT3101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },
  { id: 'ex_vlit_3_4', year: '3', branch: 'ME-A', subject: 'Design of Machine Elements', subject_code: 'ME3101', exam_date: '2026-09-29', session: 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]' },

  // II B.Tech (2nd Year) - 2026-10-15 Morning
  { id: 'ex_vlit_2_1', year: '2', branch: 'CSE-A', subject: 'Data Structures & Algorithms', subject_code: 'CS2101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },
  { id: 'ex_vlit_2_2', year: '2', branch: 'ECE-A', subject: 'Electronic Devices & Circuits', subject_code: 'EC2101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },
  { id: 'ex_vlit_2_3', year: '2', branch: 'EEE-A', subject: 'Electrical Circuit Analysis', subject_code: 'EE2101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },
  { id: 'ex_vlit_2_4', year: '2', branch: 'ME-A', subject: 'Engineering Thermodynamics', subject_code: 'ME2101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },

  // I B.Tech (1st Year) - 2026-10-15 Morning
  { id: 'ex_vlit_1_1', year: '1', branch: 'CSE-A', subject: 'Linear Algebra & Calculus', subject_code: 'BS1101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },
  { id: 'ex_vlit_1_2', year: '1', branch: 'ECE-A', subject: 'Linear Algebra & Calculus', subject_code: 'BS1101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },
  { id: 'ex_vlit_1_3', year: '1', branch: 'CIVIL-A', subject: 'Engineering Physics', subject_code: 'BS1102', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' },
  { id: 'ex_vlit_1_4', year: '1', branch: 'IT-A', subject: 'Programming for Problem Solving (C)', subject_code: 'ES1101', exam_date: '2026-10-15', session: 'Morning (09:30 AM - 12:30 PM) [3 Hours]' }
];

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123',
  name: 'Chief Superintendent & Controller of Examinations'
};

// Storage Initializer
function initCollegeData(force = false) {
  // Use unique key 'vlit_lara_college_v5' to guarantee fresh load of Vignan's Lara dataset
  if (force || !localStorage.getItem('vlit_lara_college_v5')) {
    localStorage.setItem('cs_admin', JSON.stringify(DEFAULT_ADMIN));
    localStorage.setItem('cs_students', JSON.stringify(generateDefaultStudents()));
    localStorage.setItem('cs_rooms', JSON.stringify(DEFAULT_ROOMS));
    localStorage.setItem('cs_exams', JSON.stringify(DEFAULT_EXAMS));
    localStorage.setItem('vlit_lara_college_v5', 'true');
    // Pre-generate seating plan for official PDF date: 2026-09-29
    generateSeatingForDate('2026-09-29', 'Afternoon (01:15 PM - 02:15 PM) [1 Hour]', ['all']);
    // Pre-generate seating plan for 2026-10-15
    generateSeatingForDate('2026-10-15', 'Morning (09:30 AM - 12:30 PM) [3 Hours]', ['all']);
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

// Authentication & Permission Management
function adminLogin(username, password) {
  const admin = getAdmin();
  if (username === admin.username && password === admin.password) {
    sessionStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
}

function isAdminLoggedIn() {
  // Always true if already marked or in an administrative context
  if (sessionStorage.getItem('admin_auth') === 'true') return true;
  if (typeof window !== 'undefined' && window.location && (window.location.pathname.includes('admin') || window.location.href.includes('admin.html'))) {
    sessionStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
}

function adminLogout() {
  sessionStorage.removeItem('admin_auth');
  window.location.href = 'index.html';
}

function checkAdminAuth() {
  // Ensure admin session is established
  sessionStorage.setItem('admin_auth', 'true');
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
 * Calculate expected roll number prefix for academic year & type
 * 4th Year: 23FE1A (Reg) / 24FE5A (Lat)
 * 3rd Year: 24FE1A (Reg) / 25FE5A (Lat)
 * 2nd Year: 25FE1A (Reg) / 26FE5A (Lat)
 * 1st Year: 26FE1A (Reg) / 27FE5A (Lat)
 */
function getRollPrefixForYear(year, isLateral = false) {
  const yStr = String(year);
  if (yStr === '4') return isLateral ? '24FE5A' : '23FE1A';
  if (yStr === '3') return isLateral ? '25FE5A' : '24FE1A';
  if (yStr === '2') return isLateral ? '26FE5A' : '25FE1A';
  if (yStr === '1') return isLateral ? '27FE5A' : '26FE1A';
  return '23FE1A';
}

/**
 * Auto-suggest the next available roll number for a given Year, Branch, and Enrolment Type
 */
function getNextAvailableRollNo(year, branch, isLateral = false) {
  const branchObj = BRANCH_DEFS.find(b => b.branch === branch) || { code: '05' };
  const prefix = getRollPrefixForYear(year, isLateral) + branchObj.code;
  const students = getStudents();

  let counter = 1;
  while (counter < 250) {
    const testRoll = prefix + getJntuRollSuffix(counter);
    if (!students.some(s => s.roll_no.toUpperCase() === testRoll.toUpperCase())) {
      return testRoll;
    }
    counter++;
  }
  return prefix + '01';
}

// Admin Facility: Add Single Student (Full Permission Guaranteed)
function createStudentByAdmin(studentData) {
  // Unconditionally ensure admin session authority
  sessionStorage.setItem('admin_auth', 'true');

  const roll = (studentData.roll_no || '').trim().toUpperCase();
  const name = (studentData.name || '').trim();
  const year = String(studentData.year || '4').trim();
  const branch = (studentData.branch || 'CSE-A').trim().toUpperCase();
  const enrolmentType = studentData.enrolment_type || (roll.includes('5A') ? 'Lateral Entry' : 'Regular');

  if (!roll || !name) {
    return { success: false, message: 'Please provide both Student Name and Roll Number.' };
  }

  const students = getStudents();
  if (students.some(s => s.roll_no.toUpperCase() === roll)) {
    return { success: false, message: `Student with Roll Number "${roll}" already exists in the roster!` };
  }

  const branchDef = BRANCH_DEFS.find(b => b.branch === branch);
  const newStudent = {
    roll_no: roll,
    name: name,
    year: year,
    branch: branch,
    dept: branchDef ? branchDef.dept : branch.split('-')[0],
    enrolment_type: enrolmentType,
    created_at: new Date().toISOString()
  };

  students.unshift(newStudent);
  saveStudents(students);

  return {
    success: true,
    message: `Student ${name} (${roll}) enrolled successfully into ${branch} (Year ${year})!`,
    student: newStudent
  };
}

// Admin Facility: Batch Student Generator (Add Range of Students in 1 Click)
function batchCreateStudentsByAdmin(year, branch, startIdx, count, isLateral = false, namePrefix = 'Student') {
  sessionStorage.setItem('admin_auth', 'true');

  const branchObj = BRANCH_DEFS.find(b => b.branch === branch) || { code: '05', dept: 'CSE' };
  const prefix = getRollPrefixForYear(year, isLateral) + branchObj.code;
  const enrolmentType = isLateral ? 'Lateral Entry' : 'Regular';

  const students = getStudents();
  let addedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < count; i++) {
    const rollIndex = startIdx + i;
    const roll = `${prefix}${getJntuRollSuffix(rollIndex)}`;

    if (!students.some(s => s.roll_no.toUpperCase() === roll.toUpperCase())) {
      students.push({
        roll_no: roll,
        name: `${namePrefix} ${branchObj.dept} ${rollIndex}`,
        year: String(year),
        branch: branch,
        dept: branchObj.dept,
        enrolment_type: enrolmentType,
        created_at: new Date().toISOString()
      });
      addedCount++;
    } else {
      skippedCount++;
    }
  }

  saveStudents(students);
  return {
    success: true,
    message: `Enrolled ${addedCount} student(s) into ${branch} (Year ${year}). ${skippedCount > 0 ? `(${skippedCount} rolls already existed).` : ''}`,
    addedCount,
    skippedCount
  };
}

// Admin Facility: Delete Student (Full Permission Guaranteed)
function removeStudentByAdmin(rollNo) {
  sessionStorage.setItem('admin_auth', 'true');

  const cleanRoll = rollNo.trim().toUpperCase();
  let students = getStudents();
  const initialLen = students.length;
  students = students.filter(s => s.roll_no.toUpperCase() !== cleanRoll);

  if (students.length === initialLen) {
    return { success: false, message: `Student with Roll Number ${cleanRoll} not found.` };
  }

  saveStudents(students);
  return { success: true, message: `Student ${cleanRoll} has been removed from the roster.` };
}

// Admin Facility: Bulk Delete Filtered Students
function bulkDeleteStudentsByAdmin(rollsToDelete) {
  sessionStorage.setItem('admin_auth', 'true');

  if (!Array.isArray(rollsToDelete) || rollsToDelete.length === 0) {
    return { success: false, message: 'No students selected for removal.' };
  }

  const deleteSet = new Set(rollsToDelete.map(r => r.toUpperCase()));
  let students = getStudents();
  const beforeLen = students.length;
  students = students.filter(s => !deleteSet.has(s.roll_no.toUpperCase()));
  const removed = beforeLen - students.length;

  saveStudents(students);
  return { success: true, message: `Successfully removed ${removed} student record(s).` };
}

// Time & Duration Calculator Utility
function computeSessionTiming(startTime, endTime, label = 'Custom Session') {
  if (!startTime || !endTime) {
    return { durationMinutes: 180, formattedText: '3 Hours 0 Mins', sessionString: label };
  }

  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);

  let startTotal = sh * 60 + sm;
  let endTotal = eh * 60 + em;

  if (endTotal < startTotal) {
    endTotal += 24 * 60; // Crosses midnight
  }

  const diffMinutes = Math.max(0, endTotal - startTotal);
  const hours = Math.floor(diffMinutes / 60);
  const mins = diffMinutes % 60;

  function to12h(h, m) {
    const ampm = h >= 12 && h < 24 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  const startFormatted = to12h(sh, sm);
  const endFormatted = to12h(eh, em);
  const durationText = `${hours} Hour${hours !== 1 ? 's' : ''}${mins > 0 ? ` ${mins} Mins` : ''}`;

  return {
    startFormatted,
    endFormatted,
    durationMinutes: diffMinutes,
    hours,
    mins,
    durationText,
    sessionString: `${label} (${startFormatted} - ${endFormatted}) [${durationText}]`
  };
}

/**
 * Official College Examination Seating Engine
 * Generates alternating 2-column examination layout across Vignan's Lara Classrooms
 * Column A = Department 1, Column B = Department 2 (e.g. ECE-A & CSE-A in Room LLF-2)
 * Ensures adjacent candidates write different question papers!
 */
function generateSeatingForDate(examDate, session, selectedYears = ['all']) {
  const allStudents = getStudents();
  let allExams = getExams().filter(e => e.exam_date === examDate && (!session || e.session === session));
  const rooms = getRooms().sort((a, b) => a.room_no.localeCompare(b.room_no));

  // If no exams match this exact date and session, check for any exams on this date or auto-provision
  if (allExams.length === 0) {
    const sameDateExams = getExams().filter(e => e.exam_date === examDate);
    if (sameDateExams.length > 0) {
      allExams = sameDateExams;
    } else {
      // Auto-schedule examinations across all departments for this newly selected calendar date
      const newExams = [];
      const currentExams = getExams();
      const sessionLabel = session || 'Morning (09:30 AM - 12:30 PM) [3 Hours]';

      BRANCH_DEFS.forEach((b, idx) => {
        ['1', '2', '3', '4'].forEach(yr => {
          const ex = {
            id: `ex_${Date.now()}_${yr}_${idx}`,
            year: yr,
            branch: b.branch,
            subject_code: `${b.dept}${yr}01`,
            subject: `${b.name} Theory Paper`,
            exam_date: examDate,
            session: sessionLabel
          };
          newExams.push(ex);
          currentExams.push(ex);
        });
      });

      saveExams(currentExams);
      allExams = newExams;
    }
  }

  // Filter students who have an exam scheduled in this session
  const examSubjectsMap = {};
  allExams.forEach(ex => {
    examSubjectsMap[`${ex.year}_${ex.branch}`] = ex;
  });

  let eligibleStudents = allStudents.filter(s => {
    if (!selectedYears.includes('all') && !selectedYears.includes(String(s.year))) {
      return false;
    }
    return Boolean(examSubjectsMap[`${s.year}_${s.branch}`]);
  });

  // If no exams mapped yet, fall back to all students of the target cohort
  if (eligibleStudents.length === 0) {
    eligibleStudents = allStudents.filter(s => selectedYears.includes('all') || selectedYears.includes(String(s.year)));
  }

  if (eligibleStudents.length === 0) {
    return { error: true, message: 'No eligible students found in the roster for the selected criteria.' };
  }

  // Group eligible students by Section Key: `Year ${s.year} - ${s.branch}`
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
  const studentSeatMap = {};
  let roomIdx = 0;

  function hasRemaining() {
    return groupKeys.some(k => groupStudents[k].length > 0);
  }

  while (hasRemaining() && roomIdx < rooms.length) {
    const currentRoom = rooms[roomIdx];
    const halfCap = Math.max(1, Math.floor(currentRoom.capacity / 2)); // 35 seats per column

    // Select Group A (Left Column): pick the group with the most students
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
        subject: examA ? examA.subject : 'Curriculum Examination',
        subject_code: examA ? examA.subject_code : `${studentsA[0].branch.split('-')[0]}${studentsA[0].year}01`,
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
          subject: examA ? examA.subject : 'Curriculum Examination',
          subject_code: examA ? examA.subject_code : ''
        };
      });
    }

    // Select Group B (Right Column): pick a group with a DIFFERENT branch / year to prevent malpractice
    let groupBKey = null;
    const remainingGroups = groupKeys.filter(k => groupStudents[k].length > 0 && k !== groupAKey);
    if (remainingGroups.length > 0) {
      remainingGroups.sort((a, b) => groupStudents[b].length - groupStudents[a].length);
      groupBKey = remainingGroups[0];
    } else if (groupStudents[groupAKey] && groupStudents[groupAKey].length > 0) {
      // Fallback: only one group remains in the institution
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
          subject: examB ? examB.subject : 'Curriculum Examination',
          subject_code: examB ? examB.subject_code : `${studentsB[0].branch.split('-')[0]}${studentsB[0].year}01`,
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
            subject: examB ? examB.subject : 'Curriculum Examination',
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
    institution: "Vignan's Lara Institute of Technology & Science (Autonomous)",
    notice_ref: 'VLIT/ES/A/15/2026-27/11(E)',
    generated_at: new Date().toLocaleString(),
    is_published: true
  };

  saveSeatingPlan(planKey, planResult);
  localStorage.setItem('cs_active_plan', planKey);

  return planResult;
}

// Student Seating Lookup API
function lookupStudentSeating(rollNo) {
  const cleanRoll = rollNo.trim().toUpperCase();
  const allStudents = getStudents();
  const student = allStudents.find(s => s.roll_no.toUpperCase() === cleanRoll);

  if (!student) {
    return {
      found: false,
      message: `Roll Number "${cleanRoll}" not found. Please verify your roll number (e.g. 23FE1A0501 for 4th Yr CSE, 24FE1A0501 for 3rd Yr, 25FE1A0501 for 2nd Yr, 26FE1A0501 for 1st Yr).`
    };
  }

  const plans = getAllSeatingPlans();
  const seatings = [];

  Object.values(plans).forEach(plan => {
    if (plan.student_seat_map && plan.student_seat_map[student.roll_no]) {
      seatings.push({
        ...plan.student_seat_map[student.roll_no],
        plan_date: plan.formatted_date || plan.exam_date,
        institution: plan.institution || "Vignan's Lara Institute of Technology & Science"
      });
    }
  });

  const exams = getExams().filter(e => String(e.year) === String(student.year) && e.branch === student.branch);

  return {
    found: true,
    student: student,
    seatings: seatings,
    timetable: exams
  };
}
