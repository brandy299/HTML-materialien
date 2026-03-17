on run
	set deployDir to "/Users/yabrand/Desktop/Projekte/Github HTML Pipeline"
	do shell script "bash " & quoted form of (deployDir & "/verwalten.sh") & " 2>&1 || true"
end run
