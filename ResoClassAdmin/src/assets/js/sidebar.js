var base_url = "https://google.com/";
$(document).ready(function () {
	$('select').select2();
	var listitem = "";

	var listitem_header = "";
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
	$("select").select2();
});
