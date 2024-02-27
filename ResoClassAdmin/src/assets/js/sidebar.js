var base_url = "https://google.com/";
$(document).ready(function() {
    var listitem="";
    listitem += `<div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li id="dashboard_menu">
                    <a href="dashboard.html"><i class="la la-dashboard"></i> <span> Dashboard</span></a>
                </li>
                <li id="students_menu">
                    <a href="students.html"><i class="las la-users"></i> <span> Students</span> </a>
                </li>
                <li class="menu-title"> 
                    <span>Organization</span>
                </li>
                <li id="designations_menu">
                    <a href="designations.html"><i class="las la-user-graduate"></i> <span> Designations</span> </a>
                </li>
                <li id="users_menu"> 
                    <a href="users.html"><i class="las la-users-cog"></i> <span>Users</span></a>
                </li>
                <li class="menu-title"> 
                    <span>Curriculum</span>
                </li>
                <li id="courses_menu">
                    <a href="courses.html"><i class="las la-chalkboard-teacher"></i> <span> Course/Class </span> </a>
                </li>
                <li id="subjects_menu">
                    <a href="subjects.html"><i class="las la-school"></i> <span> Subjects </span> </a>
                </li>
                <li id="chapters_menu">
                    <a href="chapters.html"><i class="las la-book-open"></i> <span> Chapters </span> </a>
                </li>
                <li id="topics_menu">
                    <a href="topics.html"><i class="las la-book-reader"></i> <span> Topics </span> </a>
                </li>
                <li id="subtopics_menu">
                    <a href="subtopics.html"><i class="las la-book-reader"></i> <span> Sub-Topics </span> </a>
                </li>
                <li class="menu-title"> 
                    <span>Media</span>
                </li>
                <li id="chaptervideos_menu">
                    <a href="chaptervideos.html"><i class="las la-file-video"></i> <span> Chapter Videos </span> </a>
                </li>
                <li id="topicvideos_menu">
                    <a href="topicvideos.html"><i class="las la-file-video"></i> <span> Topic Videos </span> </a>
                </li>
                <li id="subtopicvideos_menu">
                    <a href="subtopicvideos.html"><i class="las la-file-video"></i> <span> Sub-Topic Videos </span> </a>
                </li>
                <li class="menu-title"> 
                    <span>Assessments</span>
                </li>
                <li id="exams_menu"> 
                    <a href="exams.html"><i class="las la-list-alt"></i> <span>Exams</span></a>
                </li>
                <li id="questionbank_menu"> 
                    <a href="questionbank.html"><i class="las la-question-circle"></i> <span>Question Bank</span></a>
                </li>
                <li class="menu-title"> 
                    <span>Reports</span>
                </li>
                <li id="examresult_menu"> 
                    <a href="examresult.html"><i class="las la-check-square"></i> <span>Exam Result</span></a>
                </li>
                <li id="studentwiseanalysis_menu"> 
                    <a href="studentwiseanalysis.html"><i class="las la-user-tie"></i> <span>Student-wise Analysis</span></a>
                </li>
                <li id="chapterwise_menu"> 
                    <a href="chapterwise.html"><i class="las la-book-open"></i> <span>Chapter-wise Practice Report</span></a>
                </li>
                <li id="topicwise_menu"> 
                    <a href="topicwise.html"><i class="las la-book-reader"></i> <span>Topic-wise Practice Report</span></a>
                </li>
                <li id="subtopicwise_menu"> 
                    <a href="subtopicwise.html"><i class="las la-book-reader"></i> <span>Sub-Topic-wise Practice Report</span></a>
                </li>
            </ul>
        </div>
    </div>`;
    $("#sidebar").html(listitem); 

	var listitem_header="";
	listitem_header += `<div class="header-left">
			<a href="#!" class="logo">
				<img src="assets/img/logo.png" width="40" height="40" alt="">
			</a>
		</div>
		<a id="toggle_btn" href="javascript:void(0);">
			<span class="bar-icon">
				<span></span>
				<span></span>
				<span></span>
			</span>
		</a>
		<div class="page-title-box">
			<h3>ResoCLASS - Administrator</h3>
		</div>
		<a id="mobile_btn" class="mobile_btn" href="#sidebar"><i class="fa fa-bars"></i></a>
		<ul class="nav user-menu">
			<li class="nav-item dropdown has-arrow main-drop">
				<a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
					<span class="user-img"><img src="assets/img/profiles/avatar-21.jpg" alt="">
					<span class="status online"></span></span>
					<span>Admin</span>
				</a>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="profile.html">My Profile</a>
					<a class="dropdown-item" href="login.html">Logout</a>
				</div>
			</li>
		</ul>
		<div class="dropdown mobile-user-menu">
			<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
			<div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item" href="profile.html">My Profile</a>
				<a class="dropdown-item" href="login.html">Logout</a>
			</div>
		</div>`;
	$("#header").html(listitem_header); 
	$('select').select2();
});