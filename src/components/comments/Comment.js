import React, {useState, useEffect, memo, useCallback} from 'react'
import {Link} from 'react-router-dom'
import db from '../../utils/db.json'
import axios from 'axios'

function Comment({key, data}) {
  const [authorName, setauthorName] = useState('')

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${data.author}/`);
      const authorData = await response.json();
      setauthorName(authorData.first_name + ' ' + authorData.last_name);
      console.log('comment users authorid', data.author)
    } catch (err) {
      setauthorName("Unknown User");
    }
  }, [data.author, data.author]);
  
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  

  return (
    <Link to={`/Profile/${data.author}`}>
      <li className="media p-4">
        <div>
          <img
            src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADhCAMAAADmr0l2AAAAbFBMVEX///8AAAAmJiZGRkbV1dXu7u74+PgwMDA3Nze7u7uGhoa/v78PDw9gYGBlZWWYmJjl5eVQUFCOjo5ubm6wsLB4eHifn5+qqqpbW1sUFBQeHh7f39/S0tKjo6Pp6enDw8M+Pj6BgYF0dHRTU1M7muleAAAEsklEQVR4nO2d63aqMBBGqRdQsXivt5Zqff93rJ7TnmNgkmAgmXyu2f/aVV3fVigwTIYkuSPNJ7vD9AWY6eF1+ZkmNIOCO15XrI6E3nzBHatLimHV74M7UtesVb8Vd57uOd/7Pc3ed0/x32/DncUPm1+/NXcSX/zsh0PuHP5In3cH/Mvq5nfkTuGT8ir4xR3CJ5OrIHcGr+yT5J07g1+OyVvlN5VTHDTGNZ3KQb52korGXPWZJH3l5w/ufO2ZKUJFklU2WXjUfyqLpPdcW+j1ul0R6osgHCKIjgiiI4LoiCA6IoiOCKIjguiIIDoiiI4IoiOC6IggOiKIjgiiI4LoiCA6IoiOCNopyyELpW5BRKeCc87+9UXuXbDa2haahWdBbr9bYp+CZUgVDTOfgudwHnp8Cqp/zMTAn2Aa0kPL+NkFP/0JJqOQIjrmHgXVbloeeuaILY+DIU00WLbQloL8ixAmloRtT9W4Dd9sAdtfTax3GReLWYN8cj2IjgiiI4LoiCA6IoiOCKIjguiIIDoiiI4IoiOC6IggOiKIjgiiI4LoiKCNNF9OvLMcN+os9CEYrFvN1rLlSTDgqMfClsWHYNBuQ7fvsJVg4FYnp/2wlWDgacDb4ILncHI3NuY0HgQD92u/BhdchtRr0NXUueBnSD1rZ6gHwcDNeC5+LQWDfoUNFkl0LhjyQOF0kGh/LjpQZ+Z6o2/pPfcmmCRlPvZObulb9ioYOSKIjgiiI4LoiCA6IoiOCKIjguiIIDoiiI4IoiOC6IggOiKIjgiiI4LoiCA6IoiOCKIjguiIIDoiiI4IolMVzJSf3Zv8okEdL7lI1PbPNXe89mwVoaKyUmDvvOgrFiqLc87VqbbZO3fCdrwfVJ8t0WY+NTPaNP4MhrPdaRSUmszAab3VpdmGHMPI42uMwuFlWRM/zuc2/HJb/eQ0tXdl93vtOqwLx1uSk8srS5vfouusLlz+RDm6vNQ2LTnQ6goLP+ctE4eXfpn9nLaKzvm3Rtbh4zYu7Usz+xsE4C7j40P6TYJpFI+lUB8P8/C/BIPgcO8j7sNUVqk/uh/qBWN4LswLsUZ98Nh+oxWcewr8GBm1di1/ZE/UCTodc7qmr1taOZ9dmr6HRjACv92b7ao9JUnGytvQgtRpX6+k39ALFjUjuV2QWuGbwVxC2wXHhN8pcMoWWAWp9cvWJ5VFhE1wS/jZnzUXERZBatLMjiOnM2ZBqjzhNGuDD6MgdabX4Ko/KkyCZ8LPaRgMJwZBqry05MrpjF6Qqsvh+ekFqfNX+wOu4kMnSF0rfzDmdEYjSNVzHAelMEMKplT5DPQeHCVIls/cBvnwQwgOD4Sf7QGI0VIXJMtnuPcXa4Jk+ezIHdOdqiBZPgP2qwgW5PcH3aShCo6mhJ/1nlrU5ISRwh68i8gm2IMpn2mwCOKUB3WYBU/c8dpjFEQqD+owCV64w3WBQdBxInZk6AXRymcatIJw5TMNOkGnScMxohEELJ9poAVdnykQIaQgZPlMAyUIWl6iIQSdBn1HS10QtrxEU+sweDK/Wg0Gt3ymQy0Sus75jhiliwK5fKbl7j4gdPlMz++d3B54eUnPcdJ72a+gDn/f9YBpG8J5IfIAAAAASUVORK5CYII=`}
            className="mr-3 text-center"
            alt="..."
            width="50px"
          />
          <div className="media-body">
            <h5 className="mt-0 mb-1">{authorName}.</h5>
            <label className="font-italic font-weight-bold">Comment:</label>
            <span className="ml-3">{data.text}</span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default memo(Comment)