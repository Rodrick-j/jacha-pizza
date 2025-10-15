param(
  [string]$Source = "C:\pizzas.jpg",
  [string]$Dest   = "c:\Users\DE\Desktop\Sistema_Web\assets\img\pizzas"
)

$ErrorActionPreference = 'Stop'

if (!(Test-Path $Source)) { throw "No existe la carpeta $Source" }
New-Item -ItemType Directory -Force -Path $Dest | Out-Null

function Remove-Accents([string]$s){
  if (-not $s) { return $s }
  $d = $s.Normalize([Text.NormalizationForm]::FormD)
  -join ($d.ToCharArray() | Where-Object { [Globalization.CharUnicodeInfo]::GetUnicodeCategory($_) -ne [Globalization.UnicodeCategory]::NonSpacingMark })
}
function Make-Slug([string]$s){
  if (-not $s) { return $s }
  $t = $s -replace '^\s*Pizza\s+',''
  $t = Remove-Accents $t
  $t = $t.ToLower() -replace '[^a-z0-9]+','-'
  $t -replace '(^-|-$)',''
}

$pizzas = @(
  @{Id='1';  Name='Margarita'}
  @{Id='2';  Name='Pepperoni'}
  @{Id='3';  Name='Hawaiana'}
  @{Id='4';  Name='Cuatro Quesos'}
  @{Id='5';  Name='Vegetariana'}
  @{Id='6';  Name='Barbacoa'}
  @{Id='7';  Name='Mexicana'}
  @{Id='8';  Name='Pollo BBQ'}
  @{Id='9';  Name='Marinera'}
  @{Id='10'; Name='Carbonara'}
  @{Id='11'; Name='Napolitana'}
  @{Id='12'; Name='Prosciutto'}
  @{Id='13'; Name='Alfredo'}
  @{Id='14'; Name='Suprema'}
  @{Id='15'; Name='Mediterránea'}
)

$files = Get-ChildItem -Path $Source -File -Include *.jpg,*.jpeg,*.png
$report = @()

# Manual filename hints for faster mapping (based on common names)
$manualMap = @{
  'Margarita'   = 'margarita.jpg'
  'Pepperoni'   = 'pepperoni.jpg'
  'Hawaiana'    = 'hawaiana.jpg'
  'Cuatro Quesos' = 'cuatroquesos.jpg'
  'Vegetariana' = 'vegetariana.jpg'
  'Barbacoa'    = 'barbacoa.jpeg'
  'Mexicana'    = 'mexicana.jpg'
  'Pollo BBQ'   = 'pollo bbq.jpg'
  'Marinera'    = 'marinera.jpg'
  'Carbonara'   = 'carbonara.jpg'
  'Napolitana'  = 'napolitana.jpg'
  'Prosciutto'  = 'prosciutto.jpg'
  'Alfredo'     = 'alfredo.jpg'
  'Suprema'     = 'suprema.jpg'
  'Mediterránea'= 'mediterranea.jpg'
}

foreach ($p in $pizzas) {
  $slug = Make-Slug $p.Name
  $normName = Remove-Accents $p.Name
  $normNameTight = ($normName -replace '\s+','')

  # Try manual mapping first
  $match = $null
  if ($manualMap.ContainsKey($p.Name)) {
    $candidate = Join-Path $Source $manualMap[$p.Name]
    if (Test-Path $candidate) { $match = Get-Item $candidate }
  }
  # Fallback to fuzzy match
  if (-not $match) {
    $match = $files | Where-Object {
      $bn = Remove-Accents $_.BaseName
      $tight = ($bn -replace '\s+','')
      $bn -match [Regex]::Escape($slug) -or
      $bn -match [Regex]::Escape($normName) -or
      $tight -match [Regex]::Escape($normNameTight)
    } | Select-Object -First 1
  }

  if ($match) {
    $dstBySlug = Join-Path $Dest ("$slug.jpg")
    $dstById   = Join-Path $Dest ("$($p.Id).jpg")
    Copy-Item -Force $match.FullName $dstBySlug
    Copy-Item -Force $match.FullName $dstById
    $report += "OK   $($p.Name) -> $($match.Name) => $slug.jpg & $($p.Id).jpg"
  } else {
    $report += "MISS $($p.Name) (no se encontró en $Source)"
  }
}

"Resumen:" | Write-Output
$report | ForEach-Object { " - $_" | Write-Output }
