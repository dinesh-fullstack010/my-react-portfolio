import React from "react";
export default function Art({ kind }) {
  return (
    <div className={"art " + kind} aria-hidden="true">
      {kind === "drive" ? (
        <>
          <div className="road r1" />
          <div className="road r2" />
          <div className="route" />
          <div className="pin">↗</div>
          <div className="mapnote">
            <i /> Live location
            <br />
            <small>Instructor on route</small>
          </div>
        </>
      ) : kind === "bee" ? (
        <>
          <div className="poster p1">
            meet.
            <br />
            make.
            <br />
            belong.<span>COMMUNITY / TOGETHER</span>
          </div>
          <div className="poster p2">
            B
            <span>
              GOOD PEOPLE.
              <br />
              GREAT MOMENTS.
            </span>
          </div>
        </>
      ) : kind === "forms" ? (
        <div className="formart">
          <small>YOUR NEXT IDEA STARTS HERE</small>
          <h3>Make it happen.</h3>
          <label>Your name</label>
          <div />
          <label>What's on your mind?</label>
          <div className="field" />
          <b>Send your response ↗</b>
        </div>
      ) : kind === "building" ? (
        <div className="buildings">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: 60 + i * 25 }}>
              {Array.from({ length: i * 4 }, (_, j) => (
                <i key={j} />
              ))}
            </div>
          ))}
        </div>
      ) : kind === "space" ? (
        <div className="spaceart">
          <div />
          <div />
          <div />
          <span>Explore a different perspective ↗</span>
        </div>
      ) : (
        <div className="fields">
          <i />
          <i />
          <i />
          <i />
          <span>FIELD / CONNECTED</span>
        </div>
      )}
      <span className="concept">
        Illustrative concept · not a product screenshot
      </span>
    </div>
  );
}
