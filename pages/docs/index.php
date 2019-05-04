<?php
# @Author: Andrea F. Daniele <afdaniele>
# @Email:  afdaniele@ttic.edu
# @Last modified by:   afdaniele

use \system\classes\Core;
use \system\classes\Configuration;

$this_package = 'showdown';

$documents_dir = sprintf("%s../data/%s/documents", $GLOBALS['__SYSTEM__DIR__'], $this_package);

// go to index if the first-level dir is not given
if (strlen(Configuration::$ACTION) < 1) {
	Core::redirectTo('docs/index');
}

if (is_null(Configuration::$ARG1)) {
	$file = Configuration::$ACTION;
	$md_file_path = sprintf("%s/%s.md", $documents_dir, $file);
	if (!file_exists($md_file_path)) {
		$file = sprintf('%s/index', Configuration::$ACTION);
		$md_file_path = sprintf("%s/%s.md", $documents_dir, $file);
		if (file_exists($md_file_path)) {
			Core::redirectTo('docs/'.$file);
		}else{
			// TODO: maybe show an error here
			Core::redirectTo('docs/index');
		}
	}
}else{
	$file = Configuration::$ACTION . '/' . Configuration::$ARG1;
	$md_file_path = sprintf("%s/%s.md", $documents_dir, $file);
	if (!file_exists($md_file_path)) {
		// TODO: maybe show an error here
		Core::redirectTo('docs/index');
	}
}
?>

<!-- Import Showdown v1.8.6 (http://www.showdownjs.com/) -->
<script src="<?php echo Core::getJSscriptURL('showdown.1.8.6.min.js', 'showdown') ?>" type="text/javascript"></script>

<!-- Import Showdown extensions -->

<!-- Table of Contents -->
<script src="<?php echo Core::getJSscriptURL('showdown-toc.js', 'showdown') ?>" type="text/javascript"></script>

<!-- Image Aligner -->
<script src="<?php echo Core::getJSscriptURL('showdown-image-align.js', 'showdown') ?>" type="text/javascript"></script>

<!-- Code Highlight -->
<script src="<?php echo Core::getJSscriptURL('showdown-highlight.js', 'showdown') ?>" type="text/javascript"></script>
<script src="<?php echo Core::getJSscriptURL('highlight.pack.js', 'showdown') ?>" type="text/javascript"></script>
<script>hljs.initHighlightingOnLoad();</script>

<!-- Callout -->
<script src="<?php echo Core::getJSscriptURL('showdown-callout.js', 'showdown') ?>" type="text/javascript"></script>

<!-- Table -->
<script src="<?php echo Core::getJSscriptURL('showdown-table.js', 'showdown') ?>" type="text/javascript"></script>

<!-- Anchor -->
<script src="<?php echo Core::getJSscriptURL('showdown-anchor.js', 'showdown') ?>" type="text/javascript"></script>

<!-- Import Viewer style -->
<link href="<?php echo Core::getCSSstylesheetURL('viewer.css', 'showdown') ?>" rel="stylesheet">

<link href="<?php echo Core::getCSSstylesheetURL('zenburn.css', 'showdown') ?>" rel="stylesheet">

<ol class="breadcrumb" style="background-color:white">
	<li>
		<span class="glyphicon glyphicon-book" aria-hidden="true"></span>
	</li>
	<li>
		<a href="<?php echo Configuration::$BASE.'docs/' ?>">Documentation</a>
	</li>
	<li class="<?php echo is_null(Configuration::$ARG1)? 'active' : '' ?>">
		<a href="<?php echo Configuration::$BASE.'docs/'.Configuration::$ACTION.'/' ?>">
			<?php
			if (strcmp(Configuration::$ACTION, 'index') !== 0) {
				echo Configuration::$ACTION;
			}
			?>
		</a>
	</li>
	<?php if (!is_null(Configuration::$ARG1)) {
		?>
		<li class="active">
			<a href="<?php echo Configuration::$BASE.'docs/'.Configuration::$ACTION.'/'.Configuration::$ARG1 ?>">
				<?php if (strcmp(Configuration::$ARG1, 'index') !== 0 ): ?>
					<span id="breadcrumb_current_title"></span>
				<?php endif; ?>
			</a>
		</li>
		<?php
	}
	?>
</ol>

<textarea id="_showdown_md_container" style="display:none"><?php echo trim(file_get_contents($md_file_path)) ?></textarea>

<div style="width:100%; margin:auto">
	<?php
	$documents_title = Core::getSetting('documents_title', 'showdown');
	if (strlen(trim($documents_title)) != 0) {
		?>
		<table style="width:100%; border-bottom:1px solid #ddd; margin-bottom:32px">
			<tr>
				<td style="width:100%">
					<h2><?php echo $documents_title ?></h2>
				</td>
			</tr>
		</table>
		<?php
	}
	?>
	<div id="_showdown_html_container" style="margin:50px 0 30px 0; text-align:justify;"></div>
</div>


<!-- Convert MarkDown to HTML -->
<script type="text/javascript">

$(document).ready(function(){
	var showdown_viewer = new showdown.Converter(
		{
			parseImgDimensions : true,
			extensions: ['toc', 'image-align', 'highlightjs', 'callout', 'table', 'anchor'],
			ghCompatibleHeaderId : true,
			tables : true
		}
	);
	var md_content = $("#_showdown_md_container").val();

	var html = showdown_viewer.makeHtml(md_content);

	$("#_showdown_html_container").html(html);

	// set the title of the page in the breadcrumb according to the H1 header
	$('#breadcrumb_current_title').html(
    $("#_showdown_html_container h1:first-of-type").html().replace(/<[^>]*>/g, '')
  );
});
</script>
