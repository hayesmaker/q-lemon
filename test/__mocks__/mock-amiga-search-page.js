module.exports = {
  data: `<html>
<head>
	<title>Amiga Games - Lemon Amiga Game Database</title>
		<meta name="description" content="Amiga games database with information about every Amiga game ever released!">
		<meta name="keywords" content="amiga, games, game">
	<meta name="expires" content="never">
	<meta name="content-language" content="en">
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="/inc/lemon_verd.css">
			<script src="/inc/main.js" type="text/javascript"></script>
		</head>
<body><table cellspacing="0" cellpadding="0" border="0" width="721" style="margin-bottom: 7px;">
<tr>
<td valign="top" width="100%">

<table cellspacing=0 cellpadding=0 border=0>
<tr>
<td bgcolor="#E1E7F6"><img src="/images/banner_top.gif" width=476 height=6 border=0></td>
</tr>
<tr>
<td bgcolor="#E1E7F6" background="/images/banner_background.gif"><table cellspacing=0 cellpadding=0 border=0><tr><td><img src="/images/dot.gif" width=4 height=1 border=0></td><td background="" height="60">
<a href="http://lemon.spreadshirt.co.uk" target="blank"><img src="/images/retrostore_banners.png" width="468" height="60" title="Buy some cool Amiga T-shirts in the Lemon Retro Store!" border="0"></a><br></td></tr></table></td>
</tr>
<tr>
<td bgcolor="#E1E7F6" align=right><img src="/images/banner_bottom.gif" width="476" height="6" border="0"></td>
</tr>
</table>

</td>
<td valign="top"><!--body onload = "document.search.list_title.focus()"-->
<table border="0" cellspacing="0" cellpadding="0" width="238">
<tr>
	<td colspan="3"><img src="/images/tables/games_quick-search.gif" width="238" height="24" border="0" alt="Games Quick-Search"></td>
</tr>
<tr>
	<td background="/images/tables/border_left.gif" width=4><img src="/images/dot.gif" width=4 height=1 border=0></td>
	<td width="238" class="tableWide"  style="padding-bottom: 0px; height: 42px;" valign=top>
		<table cellspacing="0" cellpadding="0" border="0" align="center" width=100%>
	<tr>
	<form action="/games/list.php" method="get" onSubmit="return checkForm(this)" name="search">
		<td><input type="text" name="list_title" value="" size="16" style="width: 189px; font-size: 11px; margin-bottom: 0px;" class="formtext"></td>
		<td align="right"><input type="image" name="submit" src="/images/buttons/go.gif" border=0></td>
	</tr>
	<tr>
	<td colspan=2><a href="/games/index.php?search=advanced">Go to Advanced Search<img src="/images/arrow_green_small.gif" width="10" height="8" alt="" border="0" hspace="3"></a></td>
	</tr>
	</form>
	</table>
		</td>
	<td background="/images/tables/border_right.gif" width=4><img src="/images/dot.gif" width=4 height=1 border=0></td>
</tr>
<tr>
	<td colspan="3"><img src="/images/tables/border_small_bottom.gif" width="238" height="6" alt="" border="0"></td>
</tr>
</table></td>
</tr>
</table>

		<div id="bug1" style="position:absolute; z-index:20; top:66px; left:102px;">
	<img src="/images/bugs/3.gif" width=44 height=15 border=0>
	</div>
		<div id="bug2" style="position:absolute; z-index:20; top:66px; left:483px;">
	<img src="/images/bugs/4.gif" width=44 height=15 border=0>
	</div>

<link rel="stylesheet" type="text/css" href="list.css">

<map name="letter_blue_Map">
<area shape="rect" coords="419,0,434,16" href="/games/list.php?list_letter=Z">
<area shape="rect" coords="403,0,418,16" href="/games/list.php?list_letter=Y">
<area shape="rect" coords="386,0,402,16" href="/games/list.php?list_letter=X">
<area shape="rect" coords="369,0,385,16" href="/games/list.php?list_letter=W">
<area shape="rect" coords="352,0,367,16" href="/games/list.php?list_letter=V">
<area shape="rect" coords="336,0,351,16" href="/games/list.php?list_letter=U">
<area shape="rect" coords="320,0,335,16" href="/games/list.php?list_letter=T">
<area shape="rect" coords="303,0,320,16" href="/games/list.php?list_letter=S">
<area shape="rect" coords="287,0,303,16" href="/games/list.php?list_letter=R">
<area shape="rect" coords="270,0,286,16" href="/games/list.php?list_letter=Q">
<area shape="rect" coords="255,0,269,16" href="/games/list.php?list_letter=P">
<area shape="rect" coords="239,0,254,16" href="/games/list.php?list_letter=O">
<area shape="rect" coords="223,0,238,16" href="/games/list.php?list_letter=N">
<area shape="rect" coords="206,0,223,16" href="/games/list.php?list_letter=M">
<area shape="rect" coords="190,0,205,16" href="/games/list.php?list_letter=L">
<area shape="rect" coords="175,0,190,16" href="/games/list.php?list_letter=K">
<area shape="rect" coords="159,0,174,16" href="/games/list.php?list_letter=J">
<area shape="rect" coords="145,0,158,16" href="/games/list.php?list_letter=I">
<area shape="rect" coords="129,0,145,16" href="/games/list.php?list_letter=H">
<area shape="rect" coords="112,0,128,16" href="/games/list.php?list_letter=G">
<area shape="rect" coords="96,0,111,16" href="/games/list.php?list_letter=F">
<area shape="rect" coords="80,0,95,16" href="/games/list.php?list_letter=E">
<area shape="rect" coords="64,0,79,16" href="/games/list.php?list_letter=D">
<area shape="rect" coords="48,0,64,16" href="/games/list.php?list_letter=C">
<area shape="rect" coords="32,0,48,16" href="/games/list.php?list_letter=B">
<area shape="rect" coords="16,0,32,16" href="/games/list.php?list_letter=A">
<area shape="rect" coords="0,0,15,16" href="/games/list.php?list_letter=0">
</map>


<table border="0" cellspacing="0" cellpadding="0" width="721">
<tr>
	<td colspan="3"><img src="/images/tables/game_wide.gif" width="721" height="24" border="0" alt="Games"></td>
</tr>
<tr>
	<td background="/images/tables/border_left.gif" width=4><img src="/images/dot.gif" width=4 height=1 border=0></td>
	<td >
		<table border="0" cellspacing="0" cellpadding="0" width="713" bgcolor="#2E4296">
		<tr>
			<td><img src="/images/letter_blue.gif" width=435 height=16 border=0 usemap="#letter_blue_Map"></td>
			<td align="right"><a href="/games/"><img src="/images/buttons/games_home.gif" width="98" height="16" border="0" alt="Amiga Games Database Home"></a></td>
		</tr>
		<tr>
			<td colspan="30" style="background-color: black; height: 1px;"></td>
		</tr>
		</tr>
		</table>

<div style="background-color: #E1E7F6;">
<table cellspacing="0" cellpadding="0" border="0" style="float: right;">
<tr>

	<td style="color:#4d4d4d;">Display:&nbsp;</td>
	<td><img src="/images/icons/view_screenshot.png" width="16" height="16" title="Screenshot View" hspace="0" vspace="6"></td>
	<td><a href="#" onclick="javascript:games_display('title');"><img src="/images/icons/view_titlescreen_off.png" width="16" height="16" title="Titlescreen View" hspace="6" vspace="6"></a></td>
	<td><a href="#" onclick="javascript:games_display('list');"><img src="/images/icons/view_list_off.png" width="16" height="16" title="List View" hspace="6" vspace="6"></a></td>
	</tr>
</table>

	<table cellspacing="4" cellpadding="0" border="0" width=>
	<tr><td width=14><a href="/games/list.php?" title="Remove Filter"><img src="/images/icons/delete.gif" width=14 height=14 border=0 vspace=0></a></td><td>Game Title containing</td><td>: <b>rtype</b></td></tr></tr><tr><td colspan=3>Found <b>3</b> games.</td></tr>	</table>
	
	<table cellspacing="4" cellpadding="0" border="0" width=>
	<tr>
		<td>
		<a href="/games/index.php?search=advanced&&list_title=rtype" rel="nofollow">Refine (Advanced Search)</a> <a href="/games/index.php?search=advanced&list_title=rtype" rel="nofollow"><img src="/images/arrow_green_small.gif" width="10" height="8" alt="" border="0"></a>		</td>
	</tr>
	</table>
	

	<table cellspacing="0" cellpadding="3" border="0" align=center>
	<form action="list.php" method="get" onSubmit="return checkForm(this)" name="search">
	<tr>
		<td align="right">Game Title:</td>
		<td colspan=4><input type="text" name="list_title" value="rtype" size="16" style="width: 262px; font-size: 11px;" class="formtext"></td>
		<td><input type="image" name="submit" src="/images/buttons/search.gif" border=0></td>
		</td>
	</tr>
	<tr>
		<td align="right">Box&nbsp;Scan:</td>
		<td width="49">
		<select name="list_box" style="width: 49px;" class="formtext">
		<option value=""></option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
		</select>
		</td>
		<td align="right">Review:</td>
		<td width="49">
		<select name="list_review" style="width: 49px;" class="formtext">
		<option value=""></option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
		</select>
		</td>
		<td align="right">&nbsp;Docs:</td>
		<td width="49">
		<select name="list_document" style="width: 49px;" class="formtext">
		<option value=""></option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
		</select>
		</td>
	</tr>
	<tr>
		<td style="padding-bottom:4px;">Advert&nbsp;Scan:</td>
		<td style="padding-bottom:4px;" width="49">
		<select name="list_advert" style="width: 49px;" class="formtext">
		<option value=""></option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
		</select>
		</td>
		<td style="padding-bottom:4px;" align="right">&nbsp;Cheat/Solution:</td>
		<td style="padding-bottom:4px;" width="49">
		<select name="list_cheat" style="width: 49px;" class="formtext">
		<option value=""></option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
		</select>
		</td>
		<td align="right">&nbsp;Video:</td>
		<td width="49">
		<select name="list_video" style="width: 49px;" class="formtext">
		<option value=""></option>
		<option value="yes">Yes</option>
		<option value="no">No</option>
		</select>
		</td>
	</tr>
	</form>
	</table>

<table border=0 cellpadding=3 cellspacing=0 align=center width=708><tr><td class="tablecolor" align=center width=242 valign=top><br><a href="details.php?id=2962" class="games"><img src="http://www.lemonamiga.com/games/screenshots/thumbs/mastertype.png" width=160 height=128 border=0 class="border" alt="MasterType"><br><b>MasterType</b></a><br><a href="?list_year=1985&list_title=rtype" class="games">1985</a>,  <a href="?list_publisher=Scarborough Systems&list_title=rtype" class="games">Scarborough Systems</a><br>
<a href="?list_genre=Educational&list_sub_genre=Typing&list_title=rtype" class="games" style="font-size: 10px;">Educational - Typing</a><br><a href="details.php?id=2962"><img src="/images/buttons/details.gif" width="55" height="17" border="0" hspace=1 vspace=1 alt="Details"></a><br></td>

<td class="tablecolor" align=center width=242 valign=top><br><a href="details.php?id=918" class="games"><img src="http://www.lemonamiga.com/games/screenshots/thumbs/r-type.png" width=160 height=128 border=0 class="border" alt="R-Type"><br><b>R-Type</b></a><br><a href="?list_year=1989&list_title=rtype" class="games">1989</a>,  <a href="?list_publisher=Electric Dreams&list_title=rtype" class="games">Electric Dreams</a><br>
<a href="?list_genre=Shoot'em Up&list_sub_genre=H-Scrolling&list_title=rtype" class="games" style="font-size: 10px;">Shoot'em Up - H-Scrolling</a><br><a href="details.php?id=918"><img src="/images/buttons/details.gif" width="55" height="17" border="0" hspace=1 vspace=1 alt="Details"></a><a href="advert.php?id=918"><img src="http://www.lemonamiga.com/images/buttons/advert.gif" width=52 height=17 border=0 hspace=1 vspace=1 alt="Advert"></a><a href="/games/docs.php?id=1384"><img src="/images/buttons/hints.gif" border="0" alt="Hints" hspace=1 vspace=1></a><a href="cheats.php?id=918"><img src="/images/buttons/cheat.gif" width=44 height=17 border=0 hspace=1 vspace=1 alt="Cheat"></a><a href="details.php?id=918&music_autostart=true"><img src="http://www.lemonamiga.com/images/buttons/music.gif" width=44 height=17 border=0 hspace=1 vspace=1 alt="Music"></a><br></td>

<td class="tablecolor" align=center width=242 valign=top><br><a href="details.php?id=919" class="games"><img src="http://www.lemonamiga.com/games/screenshots/thumbs/r-type_ii.png" width=160 height=128 border=0 class="border" alt="R-Type II"><br><b>R-Type II</b></a><br><a href="?list_year=1991&list_title=rtype" class="games">1991</a>,  <a href="?list_publisher=Activision&list_title=rtype" class="games">Activision</a><br>
<a href="?list_genre=Shoot'em Up&list_sub_genre=H-Scrolling&list_title=rtype" class="games" style="font-size: 10px;">Shoot'em Up - H-Scrolling</a><br><a href="details.php?id=919"><img src="/images/buttons/details.gif" width="55" height="17" border="0" hspace=1 vspace=1 alt="Details"></a><a href="advert.php?id=919"><img src="http://www.lemonamiga.com/images/buttons/advert.gif" width=52 height=17 border=0 hspace=1 vspace=1 alt="Advert"></a><a href="/games/docs.php?id=1385"><img src="/images/buttons/instructions.gif" border="0" alt="Instructions" hspace=1 vspace=1></a><a href="cheats.php?id=919"><img src="/images/buttons/cheat.gif" width=44 height=17 border=0 hspace=1 vspace=1 alt="Cheat"></a><br></td>

</tr>
<tr>


</tr>
</table>


<br>

<br>

<div style="width: 685; padding: 6px; background-color: #FFFFCC; border: 1px solid #FFCC00; margin-left: 6px; margin-top: 5px; margin-bottom: 5px; clear: left;" align="center">
<strong>Tip:</strong> Get <a href="/links/redirect.php?id=45" target="blank" style="font-family: arial;">Amiga Forever<img src="/images/icons/popup_window.gif" width="11" height="10" border="0" style="margin-left: 3px;"></a> for super-comfy Amiga emulation with pre-installed Workbench, games and other goodies!
</div>

<br>


</div>

	</td>
	<td background="/images/tables/border_right.gif" width=4><img src="/images/dot.gif" width=4 height=1 border=0></td>
</tr>
<tr>
	<td colspan="3"><img src="/images/tables/border_bottom_wide.gif" width="721" height="6"border="0"></td>
</tr>
</table>


<div align="center" style="width: 721px;"><div class="footerText" align=center>A sister site to <a href="https://www.lemon64.com" target="blank" class="footerLink">Lemon64</a>. Made in Sweden by <a href="/help/kim-lemon.php" class="footerLink">Kim Lemon</a> 2004-2019.<br>
<a href="/news/" title="Amiga News" class="footerLink">News</a> &nbsp;<a href="/games/" title="Amiga Games" class="footerLink">Games</a> &nbsp;<a href="/lemonade/" title="Lemonade" class="footerLink">Lemonade</a> &nbsp;<a href="/forum/" title="Amiga Forum" class="footerLink">Forum</a> &nbsp;<a href="/help/" title="Amiga Help" class="footerLink">Help</a> &nbsp;<a href="/links/" title="Amiga Links" class="footerLink">Links</a> &nbsp;<a href="/help/amiga-forever.php" title="Amiga Forever" class="footerLink">Amiga Forever</a> &nbsp;<a href="/sitemap.php" title="Sitemap" class="footerLink">Sitemap</a><br>
<a href="/help/privacy_policy.php" title="Privacy Policy" class="footerLink">Privacy Policy</a>
</div>
</div>



</body>
</html>
`
};