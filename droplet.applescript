on open droppedFiles
	repeat with aFile in droppedFiles
		set filePath to POSIX path of aFile
		set fileName to do shell script "basename " & quoted form of filePath

		-- Fach abfragen
		set fach to text returned of (display dialog "Fach:" & return & "(z.B. GPU, Mathe, Deutsch)" default answer "GPU" with title "Material hochladen – " & fileName buttons {"Abbrechen", "Weiter"} default button "Weiter")

		-- Thema abfragen
		set thema to text returned of (display dialog "Thema / Lernfeld:" & return & "(z.B. LF5, Algebra, Kurzgeschichte)" default answer "" with title "Material hochladen – " & fileName buttons {"Abbrechen", "Weiter"} default button "Weiter")

		-- Titel abfragen (vorausgefüllt mit Dateiname)
		set defaultTitel to do shell script "basename " & quoted form of filePath & " .html | sed 's/[-_]/ /g'"
		set titel to text returned of (display dialog "Titel des Materials:" default answer defaultTitel with title "Material hochladen – " & fileName buttons {"Abbrechen", "Hochladen"} default button "Hochladen")

		-- deploy.sh ausführen
		set deployDir to "/Users/yabrand/Desktop/Projekte/Github HTML Pipeline"
		set result to do shell script "cd " & quoted form of deployDir & " && ./deploy.sh " & quoted form of filePath & " " & quoted form of fach & " " & quoted form of thema & " " & quoted form of titel & " 2>&1"

		-- Link extrahieren und anzeigen
		set materialLink to do shell script "echo " & quoted form of result & " | grep 'github.io' | grep 'materialien' | head -1 | xargs"
		set indexLink to "https://brandy299.github.io/HTML-materialien/"

		display dialog "✅ Erfolgreich hochgeladen!" & return & return & "Direktlink:" & return & materialLink & return & return & "Übersicht:" & return & indexLink buttons {"Link kopieren", "OK"} default button "Link kopieren" with title "Hochgeladen!"

		if button returned of result is "Link kopieren" then
			set the clipboard to materialLink
		end if

	end repeat
end open

on run
	display dialog "Ziehe eine HTML-Datei auf dieses Symbol um sie hochzuladen." with title "Material hochladen" buttons {"OK"} default button "OK"
end run
