$ErrorActionPreference='Stop'
foreach($slug in @('coffee-home','tasteaura','vibrance-parfum')){
 $file="project/$slug.html"
 $content=[IO.File]::ReadAllText($file)
 $json='[{"type":"video","src":"'+$slug+'.mp4"}]'
 $encoded=[Net.WebUtility]::HtmlEncode($json)
 $pattern='(<div class="project-media-player" data-gallery data-media=")[^"]*(")'
 $updated=[regex]::Replace($content,$pattern,('$1'+$encoded+'$2'),1)
 if($updated -eq $content){throw "Video reference not found: $slug"}
 [IO.File]::WriteAllText($file,$updated,[Text.UTF8Encoding]::new($false))
}
