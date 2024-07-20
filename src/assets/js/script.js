document.querySelectorAll('.version').forEach(item => {
    item.addEventListener('click', event => {
        const versionId = event.currentTarget.id;
        const changelogText = getChangelogText(versionId);
        document.getElementById('changelog-text').innerHTML = changelogText;
        document.getElementById('changelog').style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('changelog').style.display = 'none';
});

function getChangelogText(versionId) {
    const changelogs = {
        'v1.1.2': `
            <h2>v1.1.2</h2>
            <p>July 12, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Formatting changes to logging including:</li>
                <ul>
                    <li>New log session started</li>
                    <li>Log parts are number tracked</li>
                    <li>FPS is logged actively</li>
                    <li>TargetFPS included with activeFPS</li>
                    <li>MB/s instead of MB/sec for consistency</li>
                    <li>Fixed bug where FPS logging only occurs when debug menu is open (it now doesn't need debug menu to be open to run FPS calculations, FPS calcs are handled independently)</li>
                </ul>
                <li>Debug menu:</li>
                <ul>
                    <li>MB/s instead of MB/sec for consistency</li>
                </ul>
                <li>Engine:</li>
                <ul>
                    <li>Optimized World class for better RAM usage</li>
                    <li>Optimized some of Actor class for better RAM usage</li>
                    <li>Fixed calculation issues for FPS by resolving using GameLoop.java to calculate FPS</li>
                    <li>TargetFPS is now a lock FPS which the game cannot exceed</li>
                    <li>Fixed collisions in Actor</li>
                </ul>
                <li>Other changes:</li>
                <ul>
                    <li>Code formatting, optimized imports, changing some variables</li>
                    <li>Fixed potential issues regarding variable limits (long to double casting)</li>
                </ul>
            </ul>
            <p>These are a lot of QOL updates, but we've also ran research on the Engine after optimizations to see if memory leaks are present in the program and if CPU usage is consistent. The PDF is attached below with conclusions.</p>
            <a href="Research Notes for v1.1.2 Optimizations.pdf" download>Download Research Notes for v1.1.2 Optimizations.pdf</a>
        `,
        'v1.1.1': `
            <h2>v1.1.1</h2>
            <p>July 5, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>file_writing in Activerse.properties is now logging</li>
                <li>Debug menu changes to formatting (showing target FPS now, MUPS to MPS (Memory Per Second))</li>
                <li>FPS is now logged alongside MPS</li>
                <li>Added velocity methods</li>
                <li>Added height changes</li>
                <li>Velocity and height methods were incorporated to allow you to create your own gravity system using the update() method in subclasses of World.</li>
            </ul>
            <p>As always, this version is backwards compatible with previous versions. We're keeping this streak as long as we can!</p>
            <p>Full Changelog: v1.1.0...v1.1.1</p>
        `,
        'v1.1.0': `
            <h2>v1.1.0</h2>
            <p>June 22, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>ReadMe updated</li>
                <li>Modifications to the default subclasses to make them cleaner</li>
                <li>Added memory Tracker.java which tracks memory, and incorporated those into debug</li>
                <li>Added Activerse.Properties and setup GameLoop and MemoryTracker.java to use those properties</li>
            </ul>
            <p>The Activerse.properties file is meant to be a simple place to change memory logging, turn off collision debugging, etc.</p>
            <p>These changes might affect the performance, so do note them down.</p>
            <p>Full Changelog: v1.0.9...v1.1.0</p>
        `,
        'v1.0.9': `
            <h2>v1.0.9</h2>
            <p>June 15, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>File write using JSON instead of YAML</li>
                <li>New GameLoop.java which makes use of Activerse.Properties</li>
                <li>GameLoop.java contains method for rendering to buffer and FPS locking</li>
                <li>Introduced concept of activeFPS and TargetFPS</li>
            </ul>
            <p>Full Changelog: v1.0.8-delta...v1.0.9</p>
        `,
        'v1.0.8-delta': `
            <h2>v1.0.8-delta</h2>
            <p>June 8, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Switched from JavaFX to AWT/Swing</li>
                <li>Refactored World to use Entity array instead of LinkedList</li>
                <li>Optimized Entity and Actor classes for better performance</li>
            </ul>
            <p>Full Changelog: v1.0.7...v1.0.8-delta</p>
        `,
        'v1.0.7': `
            <h2>v1.0.7</h2>
            <p>May 15, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Debug Menu now has current sounds being played</li>
                <li>It also has current keys being pressed</li>
                <li>The file hierarchy system has been completely redone</li>
                <li>Your old files will still most likely work, but updating to this new version will absolutely cause some issues. This is because all of the engine files are now in a package, and you will need to manually import those packages in each subclass.</li>
            </ul>
            <p>Full Changelog: v1.0.6-delta...v1.0.7</p>
        `,
        'v1.0.6-delta': `
            <h2>v1.0.6-delta</h2>
            <p>May 8, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Introducing a new, powerful tool coming to Activerse: Debug mode</li>
                <li>Debug mode provides information regarding your game, including actors and their location, collisions, and loaded image assets</li>
                <li>Future debug features include audio files playing, keys currently being pressed, and specific Actor types</li>
            </ul>
            <p>Full Changelog: v1.0.5-delta...v1.0.6-delta</p>
        `,
        'v1.0.5-delta': `
            <h2>v1.0.5-delta</h2>
            <p>May 1, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Added methods for game development:</li>
                <ul>
                    <li>showText() for displaying text on the world</li>
                    <li>multi-level support via Activerse.setWorld()</li>
                </ul>
                <li>Backward compatibility maintained with previous versions</li>
            </ul>
            <p>Full Changelog: v1.0.4-delta...v1.0.5-delta</p>
        `,
        'v1.0.4-delta': `
            <h2>v1.0.4-delta</h2>
            <p>April 25, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Critical bug fixes:</li>
                <ul>
                    <li>Fixed error when Actor is removed from world but code in World is still running</li>
                </ul>
                <li>Backward compatibility with v1.0.3 and v1.0.2</li>
            </ul>
            <p>Full Changelog: v1.0.3-theta...v1.0.4-delta</p>
        `,
        'v1.0.3-theta': `
            <h2>v1.0.3-theta</h2>
            <p>April 18, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Important engine updates:</li>
                <ul>
                    <li>Introduced new logging system</li>
                    <li>Updated to handle multiple levels of logging</li>
                </ul>
                <li>Bug fixes:</li>
                <ul>
                    <li>Fixed major issues related to the rendering engine</li>
                </ul>
            </ul>
            <p>Full Changelog: v1.0.2...v1.0.3-theta</p>
        `
    };

    return changelogs[versionId] || `<p>No details available for this version.</p>`;
}
