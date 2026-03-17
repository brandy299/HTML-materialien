on run
	set deployDir to "/Users/yabrand/Desktop/Projekte/Github HTML Pipeline"
	do shell script "cd " & quoted form of deployDir & " && bash verwalten.sh > /tmp/verwalten_out.txt 2>&1" with administrator privileges without altering line endings
end run
