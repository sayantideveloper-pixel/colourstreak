# Copy images from brain folder to project images folder
$brainFolder = "C:\Users\arpan saha\.gemini\antigravity\brain\bfad9a64-01a3-46fb-b20a-7a99f9daa84d"
$projectImages = "c:\Users\arpan saha\.antigravity\colourstreak\images"

# New Hero Background
Copy-Item "$brainFolder\about_hero_v3_bg_jpg_1773144027226.png" "$projectImages\about_hero_v3_bg.png" -Force

# Trio Grid Images
Copy-Item "$brainFolder\media__1773137316954.jpg" "$projectImages\about_img1.jpg" -Force
Copy-Item "$brainFolder\media__1773137316996.jpg" "$projectImages\about_img2.jpg" -Force
Copy-Item "$brainFolder\media__1773137317003.jpg" "$projectImages\about_img3.jpg" -Force

# Mission Section
$brainFolderOld = "C:\Users\arpan saha\.gemini\antigravity\brain\36e914f0-f7c8-4149-b36c-a4c4c90b5595"
Copy-Item "$brainFolderOld\about_mission_team_1773136207570.png" "$projectImages\about_mission_team.png" -Force

Write-Host "All images synchronized successfully to the images folder!"
