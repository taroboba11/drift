//playlist combos for mood + music
const playlists = {
      sad: {
        pop: [
          "Someone Like You - Adele",
          "Skinny Love - Bon Iver",
          "Lost Cause - Billie Eilish",
          "When We Were Young - Adele",
          "The Night We Met - Lord Huron"
        ],
        country: [
          "Hurt - Johnny Cash",
          "Blue Ain't Your Color - Keith Urban",
          "If I Die Young - The Band Perry",
          "Drink a Beer - Luke Bryan",
          "Travelin' Soldier - Dixie Chicks"
        ],
        rap: [
          "Sing About Me, I'm Dying of Thirst - Kendrick Lamar",
          "Mockingbird - Eminem",
          "Dance - Nas",
          "Love Yours - J. Cole",
          "Stan - Eminem"
        ],
        hiphop: [
          "I Used To Love H.E.R. - Common",
          "Lost Ones - J. Cole",
          "Be Free - J. Cole",
          "Respiration - Black Star ft. Common & Talib Kweli",
          "All That I Got Is You - Ghostface Killah"
        ],
        rock: [
          "Black - Pearl Jam",
          "Hurt - Nine Inch Nails",
          "Disarm - Smashing Pumpkins",
          "Drive - Incubus",
          "The Night I Tried To Kill You - Suicideboys"
        ],
        classical: [
          "Adagio for Strings - Samuel Barber",
          "Gymnopédie No.1 - Erik Satie",
          "Spiegel im Spiegel - Arvo Pärt",
          "Nocturne Op.9 No.2 - Chopin",
          "Lacrimosa - Mozart"
        ],
        kpop: [
          "Blue & Grey - BTS",
          "Let Me In - BTS",
          "The Truth Untold - BTS ft. Steve Aoki",
          "Singularity - BTS",
          "Eyes, Nose, Lips - Taeyang"
        ]
      },
      happy: {
        pop: [
          "Happy - Pharrell Williams",
          "Walking on Sunshine - Katrina & The Waves",
          "Can't Stop The Feeling! - Justin Timberlake",
          "Good as Hell - Lizzo",
          "Shake It Off - Taylor Swift"
        ],
        country: [
          "Chicken Fried - Zac Brown Band",
          "Good Time - Niko Moon",
          "Wagon Wheel - Darius Rucker",
          "Life Is A Highway - Rascal Flatts",
          "American Honey - Lady A"
        ],
        rap: [
          "Good Life - Kanye West",
          "Juice - Lizzo",
          "Can't Hold Us - Macklemore & Ryan Lewis",
          "Hotline Bling - Drake",
          "Lose Control - Missy Elliott"
        ],
        hiphop: [
          "Uptown Funk - Mark Ronson ft. Bruno Mars",
          "Feel Good Inc. - Gorillaz",
          "Empire State of Mind - Jay-Z & Alicia Keys",
          "Good Morning - Kanye West",
          "Jumpman - Drake & Future"
        ],
        rock: [
          "Don't Stop Me Now - Queen",
          "Best Day of My Life - American Authors",
          "Beautiful Day - U2",
          "I'm a Believer - Smash Mouth",
          "Mr. Blue Sky - Electric Light Orchestra"
        ],
        classical: [
          "Spring from The Four Seasons - Vivaldi",
          "Ode to Joy - Beethoven",
          "Radetzky March - Strauss",
          "The Arrival of the Queen of Sheba - Handel",
          "Carnival of the Animals - Saint-Saëns"
        ],
        kpop: [
          "Dynamite - BTS",
          "Cheer Up - TWICE",
          "Fantastic Baby - BIGBANG",
          "Bang Bang Bang - BIGBANG",
          "Nonstop - OH MY GIRL"
        ]
      },
      tired: {
        pop: [
          "Someone You Loved - Lewis Capaldi",
          "Breathe Me - Sia",
          "Let It Be - The Beatles",
          "Fix You - Coldplay",
          "Slow Dancing In A Burning Room - John Mayer"
        ],
        country: [
          "Colder Weather - Zac Brown Band",
          "Humble and Kind - Tim McGraw",
          "I Drive Your Truck - Lee Brice",
          "Broken Halos - Chris Stapleton",
          "Stay - Sugarland"
        ],
        rap: [
          "Lose Yourself - Eminem",
          "The Message - Grandmaster Flash",
          "Sing About Me - Kendrick Lamar",
          "All of the Lights - Kanye West",
          "Mockingbird - Eminem"
        ],
        hiphop: [
          "Stronger - Kanye West",
          "Love The Way You Lie - Eminem ft. Rihanna",
          "Ultralight Beam - Kanye West",
          "Alright - Kendrick Lamar",
          "Be Free - J. Cole"
        ],
        rock: [
          "The Scientist - Coldplay",
          "Comfortably Numb - Pink Floyd",
          "Wish You Were Here - Pink Floyd",
          "Black Hole Sun - Soundgarden",
          "Boulevard of Broken Dreams - Green Day"
        ],
        classical: [
          "Clair de Lune - Debussy",
          "Gymnopédie No.1 - Erik Satie",
          "Moonlight Sonata - Beethoven",
          "Nocturne Op.9 No.2 - Chopin",
          "Adagio in G minor - Albinoni"
        ],
        kpop: [
          "Spring Day - BTS",
          "Sea - BTS",
          "Blue Hour - TXT",
          "Rain - Taeyeon",
          "Goodbye Road - iKON"
        ]
      },
      overwhelmed: {
        pop: [
          "Human - Christina Perri",
          "Skyscraper - Demi Lovato",
          "Breathin - Ariana Grande",
          "Let Her Go - Passenger",
          "Shake It Out - Florence + The Machine"
        ],
        country: [
          "The House That Built Me - Miranda Lambert",
          "If I Die Young - The Band Perry",
          "Concrete Angel - Martina McBride",
          "Whiskey Lullaby - Brad Paisley",
          "Hurt - Johnny Cash"
        ],
        rap: [
          "Dear Mama - Tupac",
          "All Falls Down - Kanye West",
          "Lose Yourself - Eminem",
          "Mockingbird - Eminem",
          "The Message - Grandmaster Flash"
        ],
        hiphop: [
          "Alright - Kendrick Lamar",
          "I - Kendrick Lamar",
          "Glory - Common & John Legend",
          "Love Yours - J. Cole",
          "Be Free - J. Cole"
        ],
        rock: [
          "Everybody Hurts - R.E.M.",
          "Comfortably Numb - Pink Floyd",
          "Let It Be - The Beatles",
          "Hurt - Nine Inch Nails",
          "Creep - Radiohead"
        ],
        classical: [
          "Requiem - Mozart",
          "Spiegel im Spiegel - Arvo Pärt",
          "Adagio for Strings - Samuel Barber",
          "Lacrimosa - Mozart",
          "Symphony No. 7, II - Beethoven"
        ],
        kpop: [
          "Blue Hour - TXT",
          "Palette - IU ft. G-Dragon",
          "Spring Day - BTS",
          "The Truth Untold - BTS",
          "Singularity - BTS"
        ]
      },
      nervous: {
        pop: [
          "Fight Song - Rachel Platten",
          "Stronger (What Doesn't Kill You) - Kelly Clarkson",
          "Eye of the Tiger - Survivor",
          "Roar - Katy Perry",
          "Shake It Off - Taylor Swift"
        ],
        country: [
          "Wide Open Spaces - Dixie Chicks",
          "Before He Cheats - Carrie Underwood",
          "The Fighter - Keith Urban",
          "This Is Country Music - Brad Paisley",
          "Girl in a Country Song - Maddie & Tae"
        ],
        rap: [
          "Till I Collapse - Eminem",
          "Can't Tell Me Nothing - Kanye West",
          "Power - Kanye West",
          "Lose Control - Missy Elliott",
          "Stronger - Kanye West"
        ],
        hiphop: [
          "Run This Town - Jay-Z, Rihanna & Kanye West",
          "Jumpman - Drake & Future",
          "All of the Lights - Kanye West",
          "Power - Kanye West",
          "Stronger - Kanye West"
        ],
        rock: [
          "Livin' On A Prayer - Bon Jovi",
          "We Will Rock You - Queen",
          "Eye of the Tiger - Survivor",
          "Thunderstruck - AC/DC",
          "Don't Stop Believin' - Journey"
        ],
        classical: [
          "The Planets: Mars - Holst",
          "Ride of the Valkyries - Wagner",
          "Spring from The Four Seasons - Vivaldi",
          "Eine kleine Nachtmusik - Mozart",
          "William Tell Overture - Rossini"
        ],
        kpop: [
          "Bang Bang Bang - BIGBANG",
          "Fire - BTS",
          "I Am The Best - 2NE1",
          "Mic Drop - BTS",
          "Fantastic Baby - BIGBANG"
        ]
      },
      stressed: {
        pop: [
          "Say Something - A Great Big World",
          "Breathe Me - Sia",
          "Fix You - Coldplay",
          "Let Her Go - Passenger",
          "Someone Like You - Adele"
        ],
        country: [
          "Colder Weather - Zac Brown Band",
          "The House That Built Me - Miranda Lambert",
          "Die a Happy Man - Thomas Rhett",
          "Broken Halos - Chris Stapleton",
          "Humble and Kind - Tim McGraw"
        ],
        rap: [
          "Mockingbird - Eminem",
          "Juicy - Notorious B.I.G.",
          "Lose Yourself - Eminem",
          "Changes - 2Pac",
          "Love Yourself - Logic"
        ],
        hiphop: [
          "Alright - Kendrick Lamar",
          "Lose Yourself - Eminem",
          "Love Yourself - Logic",
          "Ultralight Beam - Kanye West",
          "Be Free - J. Cole"
        ],
        rock: [
          "Mad World - Tears for Fears",
          "Boulevard of Broken Dreams - Green Day",
          "Black - Pearl Jam",
          "The Sound of Silence - Disturbed",
          "Creep - Radiohead"
        ],
        classical: [
          "Canon in D - Pachelbel",
          "Moonlight Sonata - Beethoven",
          "Adagio for Strings - Samuel Barber",
          "Clair de Lune - Debussy",
          "Spiegel im Spiegel - Arvo Pärt"
        ],
        kpop: [
          "Spring Day - BTS",
          "Blue & Grey - BTS",
          "Palette - IU ft. G-Dragon",
          "Wind Flower - MAMAMOO",
          "Eight - IU ft. Suga"
        ]
      },
      angry: {
        pop: [
          "You Oughta Know - Alanis Morissette",
          "Since U Been Gone - Kelly Clarkson",
          "Misery Business - Paramore",
          "Rolling in the Deep - Adele",
          "Break Stuff - Limp Bizkit"
        ],
        country: [
          "Before He Cheats - Carrie Underwood",
          "Gunpowder & Lead - Miranda Lambert",
          "Goodbye Earl - Dixie Chicks",
          "Two Black Cadillacs - Carrie Underwood",
          "Kerosene - Miranda Lambert"
        ],
        rap: [
          "Fight The Power - Public Enemy",
          "X Gon’ Give It To Ya - DMX",
          "Lose Yourself - Eminem",
          "Till I Collapse - Eminem",
          "Mama Said Knock You Out - LL Cool J"
        ],
        hiphop: [
          "Break Ya Neck - Busta Rhymes",
          "Ante Up - M.O.P.",
          "X Gon’ Give It To Ya - DMX",
          "Till I Collapse - Eminem",
          "Hate Me Now - Nas"
        ],
        rock: [
          "Killing In The Name - Rage Against The Machine",
          "Smells Like Teen Spirit - Nirvana",
          "Break Stuff - Limp Bizkit",
          "Welcome to the Jungle - Guns N’ Roses",
          "Bodies - Drowning Pool"
        ],
        classical: [
          "Ride of the Valkyries - Wagner",
          "Dies Irae - Verdi",
          "Symphony No. 5 - Beethoven (1st movement)",
          "O Fortuna - Carl Orff",
          "Mars, the Bringer of War - Holst"
        ],
        kpop: [
          "BOSS - NCT U",
          "Ddu-Du Ddu-Du - BLACKPINK",
          "God's Menu - Stray Kids",
          "Tiger Inside - SuperM",
          "Fire - BTS"
        ]
      }
    };

//generate playlist
    function generatePlaylist() {
  const mood = document.getElementById("mood").value;
  const genre = document.getElementById("genre").value;
  const output = document.getElementById("playlistOutput");
  //didnt select    
  if (!mood || !genre) {
    output.innerHTML = "<p style='color:red;'>Please select both a mood and a music taste.</p>";
    return;
  }

  const playlist = playlists[mood]?.[genre];

  if (!playlist || playlist.length === 0) {
    output.innerHTML = "<p>No playlist found for this combination.</p>";
    return;
  }
  //display
  output.innerHTML =
    `<h2>Playlist when You're ${mood.charAt(0).toUpperCase() + mood.slice(1)} and Want ${genre.charAt(0).toUpperCase() + genre.slice(1)} Music:</h2>` +
    playlist.map(song => `${song}`).join('<br>');
}