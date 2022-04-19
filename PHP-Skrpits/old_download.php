<?php
	// note if turning errors on and use debug to console -> the file gets corrupted...
	// only activate the two lines for debugging but consider that the file is corrupt (has the debug messages within at the start of the file)
    //ini_set("display_errors",1);
    //error_reporting(E_ALL);


// our root dir & log file
//$rootdir = "/55454_lp_campaign_now/wordpress/connectbase"; 
$rootdir = $_SERVER["DOCUMENT_ROOT"];
$rootdir = $rootdir."/connectbase";
$logfile = $rootdir."/logs/".date("Y-m-d").".txt";


// hide notices
@ini_set('error_reporting', E_ALL & ~ E_NOTICE);


//- turn off compression on the server
//@apache_setenv('no-gzip', 1);
@ini_set('zlib.output_compression', 'Off');



function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
}

function getParameter( $name )
{
    $returnvalue = "0";
    if (isset($_GET[ $name]))
	$returnvalue = $_GET[ $name ];
    
    return $returnvalue;
}

function getUserIpAddr(){
    if(!empty($_SERVER["HTTP_CLIENT_IP"])){
        //ip from share internet
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
        //ip pass from proxy
        $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    }elseif(!empty($_SERVER["REMOTE_ADDR"])){
        $ip = $_SERVER["REMOTE_ADDR"];
    }
    return $ip;
}



//$requestIp = $_SERVER['REMOTE_ADDR'];
// get currently installed version from request parameter string
// if not found -> default version is 0
$patcomid = getParameter( "id" );
$installedversion = getParameter("fw");
$downloadedversion = getParameter("dlfw");
$tutype=getParameter("tutype" );
$tuserial=getParameter("tuid" );
$tutable=getParameter("tutable" );
$tufw=getParameter("tufw" );
$tulic=getParameter("tulic" );
// some IoT log :-) 
$datetime = date("Y-m-d H:i:s");
$userIp = getUserIpAddr();

// get patcomids that are status15 users (for different pilotpase projects
$pilotphase1 = array("4711", "47", "13");
$pilotphaseDevs = array("1");
$pilotphaseService = array("10000001", "10000008", "10000009", "87654321", "78", "31");

$downloadDir = $rootdir;
if (in_array($patcomid, $pilotphase1)) {
    $downloadDir = $rootdir."/pilotphase1";
}
if (in_array($patcomid, $pilotphaseDevs)) {
    $downloadDir = $rootdir."/pilotphaseDevs";
}
if (in_array($patcomid, $pilotphaseService)) {
    $downloadDir = $rootdir."/pilotphaseService";
}

// get file in folder and get version number
foreach(array_filter(glob($downloadDir."/*.kavoupdate"), "is_file") as $fullfilename)
{
	//$fullfilename="/var/www/html/KCbaseV1.0.0.mp4";

    $filename = basename($fullfilename);
    $version = str_replace("KCbaseV","", $filename);
    $version = str_replace(".kavoupdate","", $version);
    
    if (($installedversion == $version) || ($downloadedversion == $version))
    {
		// just log the request
		$logstring = sprintf("%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;noDL:%s".PHP_EOL, $datetime, $userIp, $patcomid, $installedversion, $downloadedversion, $tutype, $tuserial, $tutable, $tufw, $tulic, $version);
		file_put_contents($logfile, $logstring, FILE_APPEND); 
		die();
	}
	else
	{
		if (file_exists($fullfilename)) 
		{
				header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
				header("Cache-Control: public"); // needed for internet explorer
				// set the headers, prevent caching
				header("Pragma: public");
				header("Expires: -1");
				header("Cache-Control: public, must-revalidate, post-check=0, pre-check=0");
				
				header("Content-Type: application/octet-stream");
				header("Content-Transfer-Encoding: Binary");
				header("Content-Disposition: attachment; filename=".$filename);
				//header("Content-Length:".filesize($fullfilename));
				
				
				
				
				
				
				
				//check if http_range is sent by browser (or download manager)
				$file_size  = filesize($fullfilename);
				if(isset($_SERVER['HTTP_RANGE']))
				{
					list($size_unit, $range_orig) = explode('=', $_SERVER['HTTP_RANGE'], 2);
					if ($size_unit == 'bytes')
					{
						//multiple ranges could be specified at the same time, but for simplicity only serve the first range
						//http://tools.ietf.org/id/draft-ietf-http-range-retrieval-00.txt
						list($range, $extra_ranges) = explode(',', $range_orig, 2);
					}
					else
					{
						$range = '';
						header('HTTP/1.1 416 Requested Range Not Satisfiable');
						exit;
					}
				}
				else
				{
					$range = '';
				}
				
				//figure out download piece from range (if set)
				list($seek_start, $seek_end) = explode('-', $range, 2);

				//set start and end based on range (if set), else set defaults
				//also check for invalid ranges.
				$seek_end   = (empty($seek_end)) ? ($file_size - 1) : min(abs(intval($seek_end)),($file_size - 1));
				$seek_start = (empty($seek_start) || $seek_end < abs(intval($seek_start))) ? 0 : max(abs(intval($seek_start)),0);
			 
				//Only send partial content header if downloading a piece of the file (IE workaround)
				if ($seek_start > 0 || $seek_end < ($file_size - 1))
				{
					header('HTTP/1.1 206 Partial Content');
					header('Content-Range: bytes '.$seek_start.'-'.$seek_end.'/'.$file_size);
					header('Content-Length: '.($seek_end - $seek_start + 1));
				}
				else
				  header("Content-Length:".filesize($fullfilename));
		
				header('Accept-Ranges: bytes');
				
				
				
				
				
				
		
			$logstring = sprintf("%s;%s;%s;%s;%s;%s;%s;%s;%s;%s;%s".PHP_EOL, $datetime, $userIp, $patcomid, $installedversion, $downloadedversion, $tutype, $tuserial, $tutable, $tufw, $tulic, $filename);
			file_put_contents($logfile, $logstring, FILE_APPEND); 
			//readfile($fullfilename); // use loop instead of pure readfile because of large files
			
			set_time_limit(0);
			$file = @fopen($fullfilename,"rb");
			fseek($file, 0);
			
			while(!feof($file)) 
			{
				print(@fread($file, 1024*8));
				ob_flush();
				flush();
				if (connection_status()!=0) 
				{
					@fclose($file);
					exit;
				}			
			}
			
			// file save was a success
			@fclose($file);
			
			exit();
		}        
    }
}
exit();
?>
