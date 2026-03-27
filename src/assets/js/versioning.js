document.querySelectorAll('.version').forEach(item => {
    item.addEventListener('click', event => {
        const versionId = event.currentTarget.id;
        const changelogText = getChangelogText(versionId);
        document.getElementById('changelog-text').innerHTML = changelogText;
        const changelogModal = document.getElementById('changelog');
        changelogModal.style.display = 'block'; // Ensure the modal is displayed
        changelogModal.classList.add('show');
    });
});

document.querySelector('.close').addEventListener('click', () => {
    const changelogModal = document.getElementById('changelog');
    changelogModal.classList.remove('show');
    setTimeout(() => {
        changelogModal.style.display = 'none'; // Reset display property after animation
    }, 500); // Match the duration of the opacity transition
});

function goBackHome() {
    window.location.href = 'activerseinfo.html';
}


function getChangelogText(versionId) {
    const changelogs = {
        'v1.4.1': `
        <h2>v1.4.1 - Systems and Stability Update</h2>
        <p>March 27, 2026</p>
        <p><strong>Major systems, utility, input, and documentation updates</strong></p>
        
        <h3>Core Systems</h3>
        <ul>
            <li><strong>World Switching Fixes:</strong> Resolved world transition issues for more reliable switching across runtime states.</li>
            <li><strong>Shaper Utility Integration:</strong> Added support for using shapes instead of images through the Shaper util.</li>
            <li><strong>Universal Error Handling System:</strong> Introduced unified error handling for consistent reporting and safer execution flow.</li>
            <li><strong>Camera System for Infinite Worlds:</strong> Added a camera system designed for large and effectively infinite world traversal.</li>
            <li><strong>Particle System:</strong> Added a reusable particle system for richer visual effects.</li>
        </ul>

        <h3>Utilities</h3>
        <ul>
            <li><strong>Integrated Math Utils:</strong> Added shared math utility helpers for common calculations.</li>
            <li><strong>Config Puller:</strong> Created a centralized config puller for configuration loading and retrieval.</li>
            <li><strong>ColourUtils Added:</strong> Added utility methods for color operations and transformations.</li>
            <li><strong>Vector Calculations:</strong> Expanded vector calculation helpers for engine and gameplay use cases.</li>
            <li><strong>Memory Updates:</strong> Implemented memupdates and memory volatility updates for improved runtime behavior.</li>
        </ul>

        <h3>UI and Input</h3>
        <ul>
            <li><strong>UIBar Update:</strong> Added UIBar and moved it into Utils for improved organization and reuse.</li>
            <li><strong>Universal Text Bar System:</strong> Added a universal text bar system for consistent text UI handling.</li>
            <li><strong>Input Handling Enhancements:</strong> Added component reference support in ActiverseMouseInfo for accurate mouse positioning, implemented shift key tracking in KeyboardInfo, and updated World to use the new shift key state management.</li>
        </ul>

        <h3>Stability and Docs</h3>
        <ul>
            <li><strong>Stability Changes:</strong> Applied broad stability improvements across engine systems.</li>
            <li><strong>Documentation Updates:</strong> Updated documentation across the entire system to match current architecture and APIs.</li>
        </ul>
        `,
        'v1.4.0': `
        <h2>v1.4.0 - First Year Update</h2>
        <p>June 23, 2025</p>
        <p><strong>The First Year Update</strong></p>
        
        <h3>New Features</h3>
        <ul>
            <li><strong>Random World Generation:</strong> Introduced Perlin Noise-powered procedural world generation via a new helper class. This enables developers to create complex, organic-looking worlds programmatically with customizable parameters for terrain, biomes, and environmental features.</li>
            <li><strong>Physics Helper Tools:</strong> Added comprehensive utilities to simplify physics-related interactions and simulations. These tools streamline common physics operations, making it easier to implement realistic movement, collisions, and force-based interactions.</li>
            <li><strong>Dynamic Lighting Overhaul:</strong> The lighting engine has been significantly enhanced for improved realism and performance. New features include more accurate light propagation, shadow casting, and optimized rendering that maintains smooth frame rates even with complex lighting setups.</li>
            <li><strong>Multithreading Support:</strong> Game loop now supports advanced multithreaded computation for smoother performance. This allows computationally intensive operations to run in parallel, reducing frame time and improving overall responsiveness.</li>
            <li><strong>Collision Detection Revamp:</strong> New system enables more accurate and responsive collisions. The updated collision detection uses optimized algorithms for better performance and supports more complex collision shapes and interactions.</li>
        </ul>
        
        <h3>Systems & Utilities</h3>
        <ul>
            <li><strong>Timer Helper Class:</strong> Simplifies management of time-based actions and delays. Provides an intuitive API for scheduling events, creating delays, and managing timed behaviors within the game loop.</li>
            <li><strong>File Utility (Time Class):</strong> New class for easier property file read/write operations. Streamlines configuration management and data persistence with a clean, type-safe interface.</li>
            <li><strong>Item System:</strong> Item subclass introduced, supports storage and usage in Actor/World systems. Provides a foundation for item-based gameplay mechanics with extensible properties and behaviors.</li>
            <li><strong>Inventory System:</strong> Fully integrated inventory per Actor with item management capabilities. Supports adding, removing, querying, and organizing items with efficient data structures.</li>
            <li><strong>ActorVector Helper Class:</strong> A custom vector math utility optimized for Actor-based operations. Provides high-performance vector calculations specifically tailored for game entity transformations and physics.</li>
            <li><strong>Audio Interface Update:</strong> Expanded with new functionality and cleaner integration. Enhanced audio management with better control over playback, volume, and audio resource handling.</li>
            <li><strong>Static Actor System:</strong> Actors marked static now skip debug updates for performance optimization. This allows for better performance when working with large numbers of non-interactive or decorative actors.</li>
        </ul>
        
        <h3>Debug & Tooling</h3>
        <ul>
            <li><strong>Debug Menu Fixes:</strong> Improved stability, formatting, and usability of the debug UI. Enhanced error reporting, better visual organization, and more informative diagnostic information.</li>
            <li><strong>Accurate FPS Tracker:</strong> Enhanced frame rate tracking for better diagnostics. Provides more precise measurements and additional metrics for performance analysis.</li>
        </ul>
        
        <h3>Development & Refactor</h3>
        <ul>
            <li><strong>Project-Wide Refactoring:</strong> General codebase cleanup and architecture improvements. Improved code organization, better separation of concerns, and enhanced maintainability throughout the project.</li>
            <li><strong>JavaDocs Updated:</strong> All classes now include up-to-date and properly formatted JavaDocs. Comprehensive documentation with examples, parameter descriptions, and usage guidelines.</li>
            <li><strong>Example Code Externalized:</strong> Example projects removed from main repo; distributed as separate binaries. This reduces repository size and allows examples to be updated independently.</li>
        </ul>
        
        <h3>UI/UX</h3>
        <ul>
            <li><strong>GUI Centering:</strong> Main Activerse GUI is now centered and screen-locked for consistent user experience. Ensures the interface remains accessible and properly positioned across different screen sizes and resolutions.</li>
        </ul>
        
        <h3>General</h3>
        <ul>
            <li><strong>Performance Improvements:</strong> Numerous backend enhancements lead to smoother gameplay and better memory usage. Optimized algorithms, reduced allocations, and improved caching strategies throughout the engine.</li>
            <li><strong>Stability Boosts:</strong> Addressed several bugs and edge cases for increased robustness. Fixed memory leaks, resolved race conditions, and improved error handling across the codebase.</li>
        </ul>
        
        <p>This version is backwards compatible with up to v1.0.7 (with some minor porting).</p>
        `,
        'v1.3.2': `
        <h2>v1.3.2 - Half year update | Breakout included</h2>
        <p>January 29, 2025</p>
        <p><strong>The changes:</strong></p>
        <ul>
        <li>🎮 Breakout Game Demo</li>
        <li>All comments are updated; Javadocs are NOT</li>
        <li>Volume controls for sounds implemented using setVolume() [accepting float 0 and 1 values] and getVolume()</li>
        <li>GameLoop error for run() 7A.IO reported</li>
        <li>Updated World ticks are now shown in debug menu</li>
        <li>Log dumps are now better formatted and include system tick monitoring, heap memory usages and garbage times</li>
        <li>Default FPS implementation is 60fps</li>
        <li>World can now be paused and resumed</li>
        <li>A breakout game is now implemented!</li>
        </ul>
        <p>The breakout game was taken from Activerse Examples and shown as a "Demo" game. This will not be provided in the official NSI install. 
            Many unspoken updates were made on this game; check GitHub release info for more on that.
        </p>
        <p>This version is backwards compatible with down to 1.1.* series. </p>
        `,

        'v1.3.1': `
        <h2>v1.3.1 - ACEHS and Safety</h2>
        <p>November 7, 2024</p> 
        <p><strong>The changes:</strong></p>
        <ul>
        <li>🛡️ Lots of Null Safety</li>
        <ul>
            <li>Added extensive null safety checks to prevent unexpected issues.</li>
        </ul>
        <li>⚙️ Enhanced Concurrent Error Handling</li>
        <ul>
            <li>Implemented more specific handling systems to manage concurrent errors effectively.</li>
        </ul>
        <li>🔧 ACEHS (Activerse Concurrent Error Handling System)</li>
        <ul>
            <li>Our new system for managing concurrent errors with detailed error codes, all explained here in the README!</li>
        </ul>
        <li>☕ JDK20+ Lambda Compatibility</li>
        <ul>
            <li>Lambda expressions are now JDK20+ friendly, while the minimum suggested JDK version remains JDK23.</li>
        </ul>
        <li>⏱️ Tick Variable Update</li>
        <ul>
            <li>Changed the tick variable from int to long for greater flexibility.</li>
        </ul>
        </ul>
        <p>This update includes significant enhancements to error handling, null safety, and concurrent error management.</p>
        <p>This version is backwards compatible with up to v1.0.7 (with some minor porting). </p>

        `,

        'v1.3.0': `
        <h2>v1.3.0 - A Bigger Than Expected Update! 🚀</h2>
        <p>September 27, 2024</p>
        <p><strong>The changes:</strong></p>>
        <ul>
            <li>📝 Added JavaDoc Documentation</li>
            <ul>
                <li>Viewable at <a href="https://knivier.com/activerseinfo">Activerse Java Docs</a>, the Javadocs are web-viewable documents generated by Java’s own systems.</li>
            </ul>
            <li>💬 Commenting Overhauls</li>
            <ul>
                <li>All classes have been updated with significantly better commenting. Nearly every method is now detailed and clearly commented, even the most basic ones!</li>
            </ul>
            <li>🖱️ Updated Mouse Inputs</li>
            <ul>
                <li>Completely overhauled mouse inputs for better reliability and accuracy after recognizing issues with the previous system. I (Knivier) apologize for this major issue!</li>
            </ul>
            <li>🔄 Code Reformats</li>
            <ul>
                <li>Methods have been reorganized and refactored for improved consistency.</li>
            </ul>
            <li>⚠️ Error Message Details</li>
            <ul>
                <li>Improved error messages provide better understanding for both beginners and advanced programmers, along with detailed stack traces.</li>
            </ul>
            <li>🔒 Fixed a Security Bug Related to Constructors</li>
            <ul>
                <li>Addressed a potential security issue where constructors in world subclasses could leak information.</li>
            </ul>
            <li>📖 Updated the README</li>
            <ul>
                <li>More information has been added, including the reedition of the research profilers from update v1.1.2.</li>
            </ul>
            <li>🔍 Updated Null Safety Systems</li>
            <ul>
                <li>This **CRITICAL** update improves bug resolution practices and makes using your own graphics easier, while still requiring an image per actor.</li>
            </ul>
            <li>📏 Added the getWidth Method to Actors</li>
            <ul>
                <li>Finally added the much-needed getWidth method to actors!</li>
            </ul>
            <li>🤖 Added A-* Path Finding!</li>
            <ul>
                <li>New pathfinding feature using \`useAStar(Actor toFollow, int iterations)\` method, introducing a bit of AI to Activerse.</li>
            </ul>
            <li>🔍 Debug Information Changes on Screen</li>
            <ul>
                <li>Debug information via the debug button has changed for better readability.</li>
            </ul>
            <li>📝 Debug Information on Logging</li>
            <ul>
                <li>Log sessions now show the date only, with log notes displaying just the time for clarity.</li>
            </ul>
            <li>🌟 Instance Window Update</li>
            <ul>
                <li>Each instance now shows **v1.3.0**.</li>
            </ul>
        </ul>
        <p>This update includes significant enhancements to documentation, mouse handling, and pathfinding, as well as critical bug fixes.</p>
        <p>This version is backwards compatible with up to v1.0.7 (with some minor porting). </p>

    `,
        'v1.2.1': `
    <h2>v1.2.1 - Minor Grief Removed</h2>
    <p>September 12, 2024</p>
    <p><strong>The changes:</strong></p>
    <ul>
        <li>File changes include:</li>
        <ul>
            <li>🛠️ Enhanced error handling inside ActiverseEngine/Activerse.java.</li>
            <li>Property file error handling improvements.</li>
            <li>📊 Added heap usage monitoring methods for debugging.</li>
            <li>Updated FPS timing to fix slight variance issues.</li>
            <li>📝 High-detail documentation added in ActiverseEngine/GameLoop.java.</li>
            <li>Code reformatting for consistency and readability.</li>
            <li>📜 Added a licensing TLDR inside the ReadME.</li>
        </ul>
        <li>Other related changes:</li>
        <ul>
            <li>🖱️ Introduced advanced mouse detection with better modification capabilities (experimental).</li>
            <li>💸 Added funding.yml for project support.</li>
        </ul>
    </ul>
    <p>This version includes new features for enhanced debugging and error handling, along with a demo:</p>
    <p><strong>🎮 Hopping Game Demo:</strong> Comes as an example showcasing the engine's new capabilities, including advanced mouse detection, performance tweaks, and error handling improvements.</p>
    <p>Some features like advanced mouse detection are experimental and may require further testing.</p>
    <p>This version is backwards compatible with up to v1.0.7 (with some minor porting). </p>
`,

        'v1.2.0': `
            <h2>v1.2.0</h2>
            <p>July 22, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>File changes include:</li>
                <ul>
                <li>Formatting to code</li>
                <li>Updated license</li>
                <li>Updated Readme</li>
                <li>Removed base examples (MyWorld subclass etc)</li>
                </ul>
                <li>Other related changes:</li>
                    <ul>
                   <li>Updated header to match version</li>
                   <li>Property file modifications</li>
                   <li>Advanced implementation of dynamic lighting</li>
                   <li>Added inbuilt class to World.java</li> 
                   <li>Logging format changes to include system time</li>
                   <li>Bug fixes to variables that could've caused data leaks via rounding errors</li>
                    </ul>
            </ul>
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>
            <p>Steady implementation of dynamic lighting isn't really there, so some bugs may present and dynamic lighting may not work to the fullest potential</p>
        `,
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
                    <li>Optimized some of the Actor class for better RAM usage</li>
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
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>

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
            </ul>
              <p>Velocity and height methods were incorporated to allow you to create your own gravity system using the update() method in subclasses of World.</p>
            <p>As always, this version is backwards compatible with previous versions. We're keeping this streak as long as we can!</p>
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.1.0...v1.1.1">Full Changelog v1.1.0...v1.1.1</p>
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>
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
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.9...v1.1.0">v1.0.9...v1.1.0</a></p>
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>
        `,
        'v1.0.9': `
            <h2>v1.0.9</h2>
            <p>June 15, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>New GameLoop.java which controls the game Hypersmooth system</li>
                <li>GameLoop.java contains method for rendering to buffer and FPS locking</li>
                <li>Introduced concept of activeFPS and TargetFPS</li>
                <li>Added FPS monitoring into Debug menu</li>
            </ul>
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.8-delta...v1.0.9">v1.0.8-delta...v1.0.9</a></p>
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>
        `,
        'v1.0.8-delta': `
            <h2>v1.0.8-delta</h2>
            <p>June 8, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Optimized Entity and Actor classes for better performance</li>
                <p>Added "end" button in Activerse game window</p>
            </ul>
            <p>Full Changelog: Not available</p>
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>
        `,
        'v1.0.7': `
            <h2>v1.0.7</h2>
            <p>May 15, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Debug Menu now has current sounds being played</li>
                <li>It also has current keys being pressed</li>
                <li>The file hierarchy system has been completely redone</li>
                <p>Your old files will still most likely work, but updating to this new version will absolutely cause some issues. This is because all of the engine files are now in a package, and you will need to manually import those packages in each subclass.</p>
            </ul>
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.6-delta...v1.0.7-delta">v1.0.6-delta...v1.0.7</a></p>
            <p>This version is backwards compatible up to v1.0.3-theta (with file changes to structuring)</p>
        `,
        'v1.0.6-delta': `
            <h2>v1.0.6-delta</h2>
            <p>May 8, 2024</p>
            <p><strong>Debug Mode:</strong></p>
            <ul>
                <li>Introducing a new, powerful tool coming to Activerse: Debug mode</li>
                <li>Debug mode provides information regarding your game, including actors and their location, collisions, and loaded image assets</li>
                <li>Future debug features include audio files playing, keys currently being pressed, and specific Actor types</li>
            </ul>
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.5-delta...v1.0.6-delta">v1.0.5-delta...v1.0.6-delta</a></p>
            <p>This version is backwards compatible up to v1.0.3-theta</p>
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
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.4-delta...v1.0.5-delta"> v1.0.4-delta...v1.0.5-delta</a></p>
            <p>This version is backwards compatible up to v1.0.3-theta</p>
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
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.3-theta...v1.0.4-delta"> v1.0.3-theta...v1.0.4-delta</a></p>
            <p>This version is backwards compatible up to v1.0.3-theta</p>
        `,
        'v1.0.3-theta': `
            <h2>v1.0.3-theta</h2>
            <p>April 18, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Important engine updates:</li>
                <ul>
                    <li>Added method getWorld()</li>
                    <li>Added method setWorld(World world)</li>
                    <li>Added method intersects(Actor other)</li>
                    <li>Added method removeObject(Actor actor)</li>
                    <li>Added method addObject(Actor actor, int x, int y)</li>
                    <li>Added method setBackgroundImage(String imagePath)</li>
                    <li>Added method getActors()</li>
                </ul>
                <li>Bug fixes:</li>
                <ul>
                    <li>Fixed major issues related to the rendering engine</li>
                </ul>
            </ul>
            <p>Full Changelog: <a href="https://github.com/knivier/Activerse/compare/v1.0.2-beta...v1.0.3-theta">v1.0.2...v1.0.3-theta</a></p>
        `,
        'v1.0.2-beta': `
            <h2>v1.0.2-beta</h2>
            <p>June 12, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Keyboard support was added</li>
            </ul>
            <p>These notes have been added well after the version was released. Prior version notes may have missing information. </p>

        `,
        'v1.0.1-alpha': `
            <h2>v1.0.1-alpha</h2>
            <p>June 11, 2024</p>
            <p><strong>The changes:</strong></p>
            <ul>
                <li>Commenting and bug fixes</li>
            </ul>
            <p>These notes have been added well after the version was released. Prior version notes may have missing information. </p>
        `,
        'v1.0.0-alpha': `
            <h2>v1.0.0-alpha</h2>
            <p>June 11, 2024</p>
            <p>This was the initial commit and was marked as an experimental project with severe instability. This has been verified. It's not recommended to use this version at all. </p>
            <p>These notes have been added well after the version was released. Prior version notes may have missing information. </p>
    `,
    };
    return changelogs[versionId] || `<p>No details available for this version.</p>`;
}
