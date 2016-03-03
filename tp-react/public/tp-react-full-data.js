var App = React.createClass({
  getInitialState: function () {
    return { selectedEpisode: 1 }
  },

  handleClick: function (episodeNumSelect) {
    this.setState({
      selectedEpisode: episodeNumSelect
    })
  },

  render: function () {
    var episodeNodes = this.props.episodes.map(function (episode) {
      return (
      <Episode
        key={episode.episode_number}
        scenes={episode.scenes}
        episodeNum={episode.episode_number}
        episodeTitle={episode.episode_title}
        episodeSubtitle={episode.episode_subtitle}
        episodeDescription={episode.episode_description}
        selectedEpisode={this.state.selectedEpisode}
        locations={this.props.locations} />)
    }.bind(this))

    var episodeNums = this.props.episodes.map(function (episode) {
      return (

      <EpisodeSelector
        onClickEvent={this.handleClick}
        key={episode.episode_number}
        episodeNumSelect={episode.episode_number}
        selectedEpisode={this.state.selectedEpisode} />
      )
    }.bind(this))

    return (
    <div className='app'>
      <div className="backgroundTop">
        <h1><span className="title">TWIN PEAKS</span> Episode Recap</h1>
      </div>
      <p>
        <strong>SELECT AN EPISODE:</strong>
        {episodeNums}
      </p>
      {episodeNodes}
    </div>

    )
  }
})

var EpisodeSelector = React.createClass({
  handleChange: function () {
    this.props.onClickEvent(
      this.props.episodeNumSelect
    )
  },

  render: function () {
    var buttonStyle
    if (this.props.episodeNumSelect === this.props.selectedEpisode) {
      buttonStyle = {
        backgroundColor: '#a40000', borderColor: '#39FF14', color: 'white', borderWidth: '2px'
      }
    }

    return (
    <button className='episodeSelector' style={buttonStyle} onClick={this.handleChange}>
      {this.props.episodeNumSelect}
    </button>

    )
  }
})

var Episode = React.createClass({
  getInitialState: function () {
    return { selectedScene: 1, selectedLocation: 5,
    selectedCharacters: [] }
  },

  handleClick: function (sceneNumSelect, sceneLocationSelect, sceneCharactersSelect) {
    this.setState({
      selectedScene: sceneNumSelect,
      selectedLocation: sceneLocationSelect,
      selectedCharacters: sceneCharactersSelect
    })
  },

  render: function () {
    var sceneNodes = this.props.scenes.map(
      function (scene) {
        return (
        <Scene
          key={scene.scene_number}
          characters={scene.characters}
          sceneNum={scene.scene_number}
          standardLocation={scene.heading.standard_location_name}
          selectedEpisode={this.props.selectedEpisode}
          selectedScene={this.state.selectedScene}
          locations={this.props.locations} />)
      }.bind(this))

    var sceneNums = this.props.scenes.map(
      function (scene) {
        return (
        <SceneSelector
          key={scene.scene_number}
          sceneNumSelect={scene.scene_number}
          sceneLocationSelect={scene.heading.standard_location_id}
          sceneCharactersSelect={scene.characters}
          onClickEvent={this.handleClick}
          selectedEpisode={this.props.selectedEpisode}
          selectedScene={this.state.selectedScene} />)
      }.bind(this))

    var mapLocations = this.props.locations.map(
      function (location) {
        return (
        <MapLocation
          key={location.standard_location_id}
          locationId={location.standard_location_id}
          name={location.standard_location_name}
          selectedLocation={this.state.selectedLocation}
          selectedCharacters={this.state.selectedCharacters} />
        )
      }.bind(this)
    )

    var showEpisode
    if (this.props.episodeNum === this.props.selectedEpisode) {
      showEpisode = <div>
                      <div className='episodeSceneMetaData'>
                        <h3>{this.props.episodeTitle} - {this.props.episodeSubtitle}</h3>
                        <p className='episodeDescription'>
                          {this.props.episodeDescription}
                        </p>
                        <p className='sceneSelector'>
                          <strong>SELECT A SCENE:</strong>
                        </p>
                        <div className='sceneNums'>
                          {sceneNums}
                        </div>
                        {sceneNodes}
                      </div>
                      <div className='map'>
                        <p>
                          <strong>Map of Twin Peaks, Population 51,201</strong>
                        </p>
                        {mapLocations}
                      </div>
                    </div>
    }
    return (
    <div className='episode'>
      {showEpisode}
    </div>
    )

  }
})

var Scene = React.createClass({
  render: function () {
    var characterNodes = this.props.characters.map(
      function (character) {
        return (
        <Character key={character.standard_character_id} name={character.standard_character_name} pic={character.character_image} />)
      })

    var showScene
    if (this.props.sceneNum === this.props.selectedScene) {
      showScene =
        <div className='scene'>
          <h3>Scene number {this.props.sceneNum}</h3>
          <h4>Location</h4>
          <Location locationName={this.props.standardLocation} />
          <h4>Characters</h4>
          <ul>
            {characterNodes}
          </ul>
        </div>
    }
    return (
    <div className='scenebox'>
      {showScene}
    </div>
    )
  }
})

var SceneSelector = React.createClass({
  handleChange: function () {
    this.props.onClickEvent(
      this.props.sceneNumSelect,
      this.props.sceneLocationSelect,
      this.props.sceneCharactersSelect
    )
  },

  render: function () {
    var buttonStyle
    if (this.props.sceneNumSelect === this.props.selectedScene) {
      buttonStyle = {
        backgroundColor: '#a40000', borderColor: '#39FF14', color: 'white', borderWidth: '2px'
      }
    }

    return (

    <button className='sceneSelector' style={buttonStyle} onClick={this.handleChange}>
      {this.props.sceneNumSelect}
    </button>

    )
  }
})

var Location = React.createClass({
  render: function () {
    return (
    <p>
      I take place in
      {' '}
      {this.props.locationName}
    </p>
    )
  }
})

var Character = React.createClass({
  render: function () {
    var divStyle = {
      backgroundImage: 'url(' + this.props.pic + ')'
    }

    return (
    <li className='characters'>
      <div className='picContainer' style={divStyle}>
      </div>
      {this.props.name}
    </li>

    )
  }
})

var MapLocation = React.createClass({
  render: function () {
    var characterNodes = this.props.selectedCharacters.map(
      function (character) {
        return (
        <Character key={character.standard_character_id} name={character.standard_character_name} pic={character.character_image} />)
      })

    var showCharacters
    if (this.props.selectedLocation === this.props.locationId) {
      showCharacters =
        <div>
          {characterNodes}
        </div>
    }

    return (

    <div className='location'>
      <div className='locationName'>
        {this.props.name}
      </div>
      {showCharacters}
    </div>

    )
  }
})

var EPISODES = [
  {
    'episode_title': 'Episode 1',
    'episode_subtitle': 'Traces to Nowhere',
    'episode_number': 1,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL ROOM'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'DOUGHNUT SHOP'
        },
        'characters': []
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'DOUGHNUT SHOP'
        },
        'characters': [
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S CRUISER"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL DINING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 122,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'WAITRESS',
            'character_group': 7,
            'raw_character_name': 'WAITRESS'
          }
        ]
      },
      {
        'scene_number': 8,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 9,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 10,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': 'JOHNSON KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "JOHNSON HOUSE/INT. NORMA'S CAR"
        },
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION ENTRANCE"
        },
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'SHERIFFS STATION RECEPTION AREA'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM A'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM A'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 17,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'PARK'
        },
        'characters': [
          {
            'standard_character_id': 73,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/8/86/Laura-Portal.jpg',
            'standard_character_name': 'LAURA',
            'character_group': 2,
            'raw_character_name': 'LAURA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 19,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': 'JOHNSON HOUSE'
        },
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': 'JOHNSON HOUSE LAUNDRY ROOM'
        },
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': "DONNA HAYWARD'S BEDROOM"
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 41,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/1/1e/Eileen-Portal.jpg',
            'standard_character_name': 'EILEEN',
            'character_group': 7,
            'raw_character_name': 'EILEEN'
          }
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL OFFICE'
        },
        'characters': [
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 25,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          }
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION INTERROGATION"
        },
        'characters': [
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          }
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'HOLDING CELL'
        },
        'characters': [
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S DEPARTMENT RECEPTION AREA"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 30,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'HARDWARE STORE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 31,
          'location': 'HARDWARE STORE'
        },
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 93,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/1/12/Nadine-Portal.jpg',
            'standard_character_name': 'NADINE',
            'character_group': 8,
            'raw_character_name': 'NADINE'
          }
        ]
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION WAITING AREA"
        },
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM A'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          }
        ]
      },
      {
        'scene_number': 35,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM B'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 37,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 38,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE        '
          }
        ]
      },
      {
        'scene_number': 39,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 40,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          }
        ]
      },
      {
        'scene_number': 41,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 17,
          'location': 'SMALL PLEASANT MOTEL ROOM'
        },
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          }
        ]
      },
      {
        'scene_number': 42,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE KITCHEN'
        },
        'characters': []
      },
      {
        'scene_number': 43,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 44,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 17,
          'location': 'MOTEL ROOM'
        },
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          }
        ]
      },
      {
        'scene_number': 46,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL AND WATERFALL'
        },
        'characters': []
      },
      {
        'scene_number': 47,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL PRIVATE QUARTERS'
        },
        'characters': []
      },
      {
        'scene_number': 48,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 49,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 59,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/40/Jacoby-Portal.jpg',
            'standard_character_name': 'JACOBY',
            'character_group': 6,
            'raw_character_name': 'JACOBY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 50,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 59,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/40/Jacoby-Portal.jpg',
            'standard_character_name': 'JACOBY',
            'character_group': 6,
            'raw_character_name': 'JACOBY'
          }
        ]
      },
      {
        'scene_number': 51,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE BEDROOM'
        },
        'characters': [
          {
            'standard_character_id': 98,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'NURSE',
            'character_group': 7,
            'raw_character_name': 'NURSE'
          },
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 52,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE UPSTAIRS HALLWAY'
        },
        'characters': [
          {
            'standard_character_id': 98,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'NURSE',
            'character_group': 7,
            'raw_character_name': 'NURSE'
          }
        ]
      },
      {
        'scene_number': 53,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE BEDROOM'
        },
        'characters': [
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 54,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 55,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 56,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 57,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 58,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 59,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'EVENING',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 60,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'EVENING',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 61,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'EVENING',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "AUDREY HORNE'S ROOM"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 62,
        'heading': {
          'standard_location_name': 'BRIGGS HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 2,
          'location': 'BOBBY BRIGGS HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 63,
        'heading': {
          'standard_location_name': 'BRIGGS HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 2,
          'location': 'BRIGGS DINING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 11,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/Betty-Portal.jpg',
            'standard_character_name': 'BETTY',
            'character_group': 7,
            'raw_character_name': 'BETTY'
          },
          {
            'standard_character_id': 18,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/2/2e/Garland-Portal.jpg',
            'standard_character_name': 'MAJOR BRIGGS',
            'character_group': 6,
            'raw_character_name': 'MAJOR BRIGGS'
          }
        ]
      },
      {
        'scene_number': 64,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': []
      },
      {
        'scene_number': 65,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 66,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 67,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 80,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d7/Log-Portal.jpg',
            'standard_character_name': 'LOG LADY',
            'character_group': 4,
            'raw_character_name': 'LOG LADY'
          }
        ]
      },
      {
        'scene_number': 68,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 15,
          'location': 'CALHOUN MEMORIAL HOSPITAL'
        },
        'characters': []
      },
      {
        'scene_number': 69,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'CALHOUN MEMORIAL HOSPITAL'
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 63,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JANEK',
            'character_group': 6,
            'raw_character_name': 'JANEK'
          }
        ]
      },
      {
        'scene_number': 70,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 63,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JANEK',
            'character_group': 6,
            'raw_character_name': 'JANEK'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 71,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 72,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 73,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 74,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 75,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': 'JOHNSON HOUSE KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 76,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': 'JOHNSON HOUSE LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 77,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 78,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 79,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          }
        ]
      },
      {
        'scene_number': 80,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 81,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'int_ext': 'EXT',
          'location': 'HAYWARD HOUSE',
          'standard_location_id': 11
        },
        'characters': []
      },
      {
        'scene_number': 82,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 41,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/1/1e/Eileen-Portal.jpg',
            'standard_character_name': 'EILEEN',
            'character_group': 7,
            'raw_character_name': 'EILEEN'
          }
        ]
      },
      {
        'scene_number': 83,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 84,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 85,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          }
        ]
      },
      {
        'scene_number': 86,
        'heading': {
          'standard_location_name': 'DR JACOBY',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 39,
          'location': "DR. JACOBY'S OFFICE"
        },
        'characters': []
      },
      {
        'scene_number': 87,
        'heading': {},
        'characters': []
      }
    ],
    'episode_description': "Cooper's investigation into the murder of Laura Palmer continues, as her secret boyfriend James Hurley is interrogated, and it appears that both trucker Leo Johnson and Laura's psychiatrist Dr. Jacoby may have some connection to the crime. Laura's best friend Donna and Audrey Horne vow to solve the murder."
  },
  {
    'episode_title': 'Episode 2',
    'episode_subtitle': 'Zen, or the Skill to Catch a Killer',
    'episode_number': 2,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'EVENING',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL '
        },
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'EVENING',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HORNE RESIDENCE WING'
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          }
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE'
        },
        'characters': []
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'HORNE CRUISER'
        },
        'characters': []
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 112,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'SWABBIE',
            'character_group': 7,
            'raw_character_name': 'SWABBIE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          }
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          }
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': 'ONE-EYED JACK\'S "LET\'S GET ACQUAINTED" ROOM'
        },
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 7,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'BARTENDER',
            'character_group': 7,
            'raw_character_name': 'BARTENDER'
          },
          {
            'standard_character_id': 13,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/ad/Blackie-Portal.jpg',
            'standard_character_name': 'BLACKIE',
            'character_group': 3,
            'raw_character_name': 'BLACKIE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          }
        ]
      },
      {
        'scene_number': 8,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'DR JACOBY',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 39,
          'location': 'DR. JACOBYS OFFICE'
        },
        'characters': []
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 41,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/1/1e/Eileen-Portal.jpg',
            'standard_character_name': 'EILEEN',
            'character_group': 7,
            'raw_character_name': 'EILEEN'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "DALE COOPER'S ROOM"
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'CALHOUN HOSPITAL'
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 15,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'MARTELL BEDROOM'
        },
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 18,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': "BLUE PINE LODGE CORRIDOR/JOSIE'S ROOM"
        },
        'characters': [
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 20,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE LIVING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': 'TWIN PEAKS SHERIFF STATION'
        },
        'characters': []
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': 'REAR OF SHERIFF STATION'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': -1,
            'character_image': '',
            'standard_character_name': 'NONCHARACTER',
            'character_group': 0,
            'raw_character_name': 'EVERYONE'
          }
        ]
      },
      {
        'scene_number': 28,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': -1,
            'character_image': '',
            'standard_character_name': 'NONCHARACTER',
            'character_group': 0,
            'raw_character_name': 'EVERYONE'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 4,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'ANNOUNCER',
            'character_group': 7,
            'raw_character_name': 'ANNOUNCER'
          }
        ]
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 34,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 35,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'INVITATION TO LOVE',
          'int_ext': 'INT',
          'location': '"INVITATION TO LOVE" SET #1',
          'standard_location_id': 40
        },
        'characters': [
          {
            'standard_character_id': 24,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CHET',
            'character_group': 7,
            'raw_character_name': 'CHET'
          },
          {
            'standard_character_id': 43,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'EMERALD',
            'character_group': 7,
            'raw_character_name': 'EMERALD'
          }
        ]
      },
      {
        'scene_number': 37,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 38,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 43,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'EMERALD',
            'character_group': 7,
            'raw_character_name': 'EMERALD'
          },
          {
            'standard_character_id': 24,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CHET',
            'character_group': 7,
            'raw_character_name': 'CHET'
          }
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'ED HURLEYS HOUSE'
        },
        'characters': [
          {
            'standard_character_id': 4,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'ANNOUNCER',
            'character_group': 7,
            'raw_character_name': 'ANNOUNCER'
          },
          {
            'standard_character_id': 93,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/1/12/Nadine-Portal.jpg',
            'standard_character_name': 'NADINE',
            'character_group': 8,
            'raw_character_name': 'NADINE'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': -1,
            'character_image': '',
            'standard_character_name': 'NONCHARACTER',
            'character_group': 0,
            'raw_character_name': '100% quiet runner!'
          }
        ]
      },
      {
        'scene_number': 40,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 41,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': 'JOHNSON HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 42,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 43,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBYS VOICE'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 44,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 46,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 47,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 48,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 49,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE OFFICE'
        },
        'characters': []
      },
      {
        'scene_number': 50,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE CORRIDOR/OFFICE'
        },
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          }
        ]
      },
      {
        'scene_number': 51,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'CHURCH'
        },
        'characters': []
      },
      {
        'scene_number': 52,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'CHURCH - CLOSER'
        },
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 53,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 54,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': 'SHERIFFS STATION'
        },
        'characters': []
      },
      {
        'scene_number': 55,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 0,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/07/Albert-Portal.jpg',
            'standard_character_name': 'ALBERT',
            'character_group': 1,
            'raw_character_name': 'ALBERT'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 56,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'SHERIFF STATION CORRIDOR'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 57,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 0,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/07/Albert-Portal.jpg',
            'standard_character_name': 'ALBERT',
            'character_group': 1,
            'raw_character_name': 'ALBERT'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 58,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'EVENING',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 59,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 60,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 61,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'ED HURLEYS HOUSE'
        },
        'characters': [
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 93,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/1/12/Nadine-Portal.jpg',
            'standard_character_name': 'NADINE',
            'character_group': 8,
            'raw_character_name': 'NADINE'
          }
        ]
      },
      {
        'scene_number': 62,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 63,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 64,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL BAR'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          }
        ]
      },
      {
        'scene_number': 65,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BENJAMIN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 66,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 22,
          'location': 'WOODS/INT. CAR'
        },
        'characters': [
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 67,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 68,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL ROOM'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 69,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 70,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER BEDROOM'
        },
        'characters': [
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          },
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 71,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'int_ext': 'INT',
          'location': "DALE COOPER'S HOTEL ROOM",
          'standard_location_id': 5
        },
        'characters': []
      },
      {
        'scene_number': 72,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER LIVING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 73,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 74,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 75,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': "LELAND PALMER'S BEDROOM"
        },
        'characters': []
      },
      {
        'scene_number': 76,
        'heading': {
          'standard_location_name': 'LUCY APARTMENT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 33,
          'location': "LUCY'S APARTMENT"
        },
        'characters': [
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 77,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S CRUISER"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 78,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 79,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 80,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 81,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S HOTEL ROOM"
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 82,
        'heading': {
          'standard_location_name': 'LUCY APARTMENT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 33,
          'location': "LUCY'S APARTMENT"
        },
        'characters': [
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 83,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL'
        },
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 84,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL BASEMENT BOILER ROOM'
        },
        'characters': [
          {
            'standard_character_id': 71,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3d/Bob-Portal.jpg',
            'standard_character_name': 'KILLER BOB',
            'character_group': 4,
            'raw_character_name': 'KILLER BOB'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          }
        ]
      },
      {
        'scene_number': 85,
        'heading': {
          'standard_location_name': 'BLACK LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 14,
          'location': 'RED-DRAPED ROOM'
        },
        'characters': [
          {
            'standard_character_id': 77,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'LITTLE MAN',
            'character_group': 4,
            'raw_character_name': 'LITTLE MAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': -1,
            'character_image': '',
            'standard_character_name': 'NONCHARACTER',
            'character_group': 0,
            'raw_character_name': 'WOMAN'
          }
        ]
      },
      {
        'scene_number': 86,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S HOTEL ROOM"
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      }
    ],
    'episode_description': 'Cooper tells Sheriff Truman and his deputies about a unique method of narrowing down the Laura Palmer murder suspects. Ben welcomes his returning brother Jerry with some bad news, and the two decide that a trip to One Eyed Jacks is needed. Cynical FBI agent Albert Rosenfield arrives in town. Josie discovers that Catherine is double-crossing her. That night, Cooper has a strange dream that elevates the murder investigation to a whole new level.'
  },
  {
    'episode_title': 'Episode 3',
    'episode_subtitle': 'Rest in Pain',
    'episode_number': 3,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 118,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'TRUDY',
            'character_group': 7,
            'raw_character_name': 'TRUDY'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE "R" DINER'
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE "R" DINER'
        },
        'characters': [
          {
            'standard_character_id': 91,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MOONEY',
            'character_group': 7,
            'raw_character_name': 'MOONEY'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'MORGUE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 25,
          'location': 'TWIN PEAKS MORGUE'
        },
        'characters': [
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 0,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/07/Albert-Portal.jpg',
            'standard_character_name': 'ALBERT',
            'character_group': 1,
            'raw_character_name': 'ALBERT'
          },
          {
            'standard_character_id': 9,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'HORNE'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 9,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 4,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'ANNOUNCER',
            'character_group': 7,
            'raw_character_name': 'ANNOUNCER'
          },
          {
            'standard_character_id': 43,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'EMERALD',
            'character_group': 7,
            'raw_character_name': 'EMERALD'
          },
          {
            'standard_character_id': 127,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MONTANA',
            'character_group': 7,
            'raw_character_name': 'MONTANA'
          },
          {
            'standard_character_id': 24,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CHET',
            'character_group': 7,
            'raw_character_name': 'CHET'
          }
        ]
      },
      {
        'scene_number': 10,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE LIVING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 12,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          },
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          }
        ]
      },
      {
        'scene_number': 13,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 61,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JADE',
            'character_group': 7,
            'raw_character_name': 'JADE'
          }
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          }
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'BRIGGS HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 2,
          'location': 'BRIGGS HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'BRIGGS HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 2,
          'location': 'BRIGGS DINING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 18,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/2/2e/Garland-Portal.jpg',
            'standard_character_name': 'MAJOR BRIGGS',
            'character_group': 6,
            'raw_character_name': 'MAJOR BRIGGS'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 11,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/Betty-Portal.jpg',
            'standard_character_name': 'BETTY',
            'character_group': 7,
            'raw_character_name': 'BETTY'
          }
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': 'TWIN PEAKS POLICE STATION'
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'POLICE STATION RECEPTION AREA'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM A'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 0,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/07/Albert-Portal.jpg',
            'standard_character_name': 'ALBERT',
            'character_group': 1,
            'raw_character_name': 'ALBERT'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 10,
          'location': "ED HURLEY'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': "ED HURLEY'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 93,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/1/12/Nadine-Portal.jpg',
            'standard_character_name': 'NADINE',
            'character_group': 8,
            'raw_character_name': 'NADINE'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 25,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 93,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/1/12/Nadine-Portal.jpg',
            'standard_character_name': 'NADINE',
            'character_group': 8,
            'raw_character_name': 'NADINE'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': []
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': []
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': [
          {
            'standard_character_id': 88,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MIKE',
            'character_group': 2,
            'raw_character_name': 'MIKE'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': [
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          }
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': "LAURA'S GRAVESITE"
        },
        'characters': [
          {
            'standard_character_id': 47,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'FATHER CLARENCE',
            'character_group': 7,
            'raw_character_name': 'FATHER CLARENCE'
          },
          {
            'standard_character_id': -1,
            'character_image': '',
            'standard_character_name': 'NONCHARACTER',
            'character_group': 0,
            'raw_character_name': 'ALL'
          }
        ]
      },
      {
        'scene_number': 34,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 67,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JOHNNY',
            'character_group': 7,
            'raw_character_name': 'JOHNNY'
          },
          {
            'standard_character_id': 47,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'FATHER CLARENCE',
            'character_group': 7,
            'raw_character_name': 'FATHER CLARENCE'
          },
          {
            'standard_character_id': 67,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JOHNNY',
            'character_group': 7,
            'raw_character_name': 'JOHNNYS VOICE'
          }
        ]
      },
      {
        'scene_number': 35,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 67,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JOHNNY',
            'character_group': 7,
            'raw_character_name': 'JOHNNY'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          },
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 37,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 39,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          }
        ]
      },
      {
        'scene_number': 40,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'THE ROADHOUSE'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 41,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 10,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'BERNARD',
            'character_group': 3,
            'raw_character_name': 'BERNARD'
          }
        ]
      },
      {
        'scene_number': 42,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'COUNTRY ROAD'
        },
        'characters': []
      },
      {
        'scene_number': 43,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 44,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'PHONE BOOTH'
        },
        'characters': [
          {
            'standard_character_id': 60,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/49/Jacques-Portal.jpg',
            'standard_character_name': 'JACQUES',
            'character_group': 3,
            'raw_character_name': 'JACQUES'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 46,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 47,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN BAR'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 48,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'int_ext': 'EXT',
          'location': 'BLUE PINE LODGE',
          'standard_location_id': 1
        },
        'characters': []
      },
      {
        'scene_number': 49,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 50,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'MARTELL BEDROOM'
        },
        'characters': []
      },
      {
        'scene_number': 51,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE OFFICE'
        },
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 52,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'MARTELL BEDROOM'
        },
        'characters': [
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          },
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          }
        ]
      },
      {
        'scene_number': 53,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 54,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': [
          {
            'standard_character_id': 21,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CARETAKER',
            'character_group': 7,
            'raw_character_name': 'CARETAKER'
          }
        ]
      },
      {
        'scene_number': 55,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': []
      },
      {
        'scene_number': 56,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 57,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE CEMETARY'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 59,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/40/Jacoby-Portal.jpg',
            'standard_character_name': 'JACOBY',
            'character_group': 6,
            'raw_character_name': 'JACOBY'
          }
        ]
      }
    ],
    'episode_description': "Cooper tries to deduce the meaning behind his strange dream the night before. Later, at the funeral of Laura Palmer, emotions explode over her grave. Norma Jennings learns that her husband Hank is up for parole. Sheriff Truman reveals to Cooper the existence of the secret society known as the Bookhouse Boys, and the society's mission against the evil in the woods of Twin Peaks. Laura's cousin Maddy arrives in town."
  },
  {
    'episode_title': 'Episode 4',
    'episode_subtitle': 'The One-Armed Man',
    'episode_number': 4,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': "PALMER'S LIVING ROOM"
        },
        'characters': [
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 4,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 4,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'ANNOUNCER',
            'character_group': 7,
            'raw_character_name': 'ANNOUNCER'
          }
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S RECEPTION AREA"
        },
        'characters': []
      },
      {
        'scene_number': 7,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 43,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'EMERALD',
            'character_group': 7,
            'raw_character_name': 'EMERALD'
          },
          {
            'standard_character_id': 24,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CHET',
            'character_group': 7,
            'raw_character_name': 'CHET'
          }
        ]
      },
      {
        'scene_number': 8,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM A'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 59,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/40/Jacoby-Portal.jpg',
            'standard_character_name': 'JACOBY',
            'character_group': 6,
            'raw_character_name': 'JACOBY'
          }
        ]
      },
      {
        'scene_number': 11,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 59,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/40/Jacoby-Portal.jpg',
            'standard_character_name': 'JACOBY',
            'character_group': 6,
            'raw_character_name': 'JACOBY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 12,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 59,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/4/40/Jacoby-Portal.jpg',
            'standard_character_name': 'JACOBY',
            'character_group': 6,
            'raw_character_name': 'JACOBY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCYS VOICE'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 13,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 14,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 15,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 10,
          'location': "ED HURLEY'S GAS FARM"
        },
        'characters': []
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': "ED HURLEY'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 109,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'SPARKY',
            'character_group': 7,
            'raw_character_name': 'SPARKY'
          }
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 93,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/1/12/Nadine-Portal.jpg',
            'standard_character_name': 'NADINE',
            'character_group': 8,
            'raw_character_name': 'NADINE'
          }
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'PRISON',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 45,
          'location': 'STATE PRISON'
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'int_ext': 'INT',
          'location': 'INSTITUTIONAL CORRIDOR',
          'standard_location_id': 43
        },
        'characters': [
          {
            'standard_character_id': 91,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MOONEY',
            'character_group': 7,
            'raw_character_name': 'MOONEY'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          }
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'PAROLE BOARD HEARING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          },
          {
            'standard_character_id': 85,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MALE BOARD MEMBER',
            'character_group': 7,
            'raw_character_name': 'MALE BOARD MEMBER'
          },
          {
            'standard_character_id': -1,
            'character_image': '',
            'standard_character_name': 'NONCHARACTER',
            'character_group': 0,
            'raw_character_name': 'WOMAN BOARD MEMBER'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          }
        ]
      },
      {
        'scene_number': 23,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 85,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'MALE BOARD MEMBER',
            'character_group': 7,
            'raw_character_name': 'MALE BOARD MEMBER'
          },
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          }
        ]
      },
      {
        'scene_number': 24,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 12,
          'location': 'TWIN PEAKS HIGH SCHOOL'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': "INT. TWIN PEAKS HIGH SCHOOL GIRLS' ROOM"
        },
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 17,
          'location': 'TIMER FALLS MOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 29,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 43,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'EMERALD',
            'character_group': 7,
            'raw_character_name': 'EMERALD'
          },
          {
            'standard_character_id': 24,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CHET',
            'character_group': 7,
            'raw_character_name': 'CHET'
          }
        ]
      },
      {
        'scene_number': 30,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 61,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'JADE',
            'character_group': 7,
            'raw_character_name': 'JADE'
          },
          {
            'standard_character_id': 43,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'EMERALD',
            'character_group': 7,
            'raw_character_name': 'EMERALD'
          },
          {
            'standard_character_id': 24,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'CHET',
            'character_group': 7,
            'raw_character_name': 'CHET'
          },
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          }
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 17,
          'location': 'MOTEL'
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 33,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 17,
          'location': 'MOTEL ROOM B'
        },
        'characters': [
          {
            'standard_character_id': 48,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/6/6f/Gerard-Portal.jpg',
            'standard_character_name': 'GERARD',
            'character_group': 3,
            'raw_character_name': 'GERARD'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 35,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 36,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 37,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 17,
          'location': 'MOTEL ROOM B'
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 48,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/6/6f/Gerard-Portal.jpg',
            'standard_character_name': 'GERARD',
            'character_group': 3,
            'raw_character_name': 'GERARD'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 38,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 48,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/6/6f/Gerard-Portal.jpg',
            'standard_character_name': 'GERARD',
            'character_group': 3,
            'raw_character_name': 'GERARD'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 17,
          'location': 'MOTEL'
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 40,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 41,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 42,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 43,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 44,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'THE TWIN PEAKS ECONO SHOPPER'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 45,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 46,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'THE LYDEKER CLINIC'
        },
        'characters': [
          {
            'standard_character_id': 81,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'LOOMER',
            'character_group': 7,
            'raw_character_name': 'LOOMER'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 47,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 48,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 49,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 50,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 51,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 52,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION RECEPTION AREA"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 53,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 54,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION A'
        },
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 55,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S RECEPTION AREA"
        },
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 56,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 57,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 44,
          'location': 'FIRING RANGE'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 58,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 59,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 60,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 61,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 28,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'COLLEEN',
            'character_group': 7,
            'raw_character_name': 'COLLEEN'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 62,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 28,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'COLLEEN',
            'character_group': 7,
            'raw_character_name': 'COLLEEN'
          }
        ]
      },
      {
        'scene_number': 63,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 28,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'COLLEEN',
            'character_group': 7,
            'raw_character_name': 'COLLEEN'
          }
        ]
      },
      {
        'scene_number': 64,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 65,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 66,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 67,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 68,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': "HAYWARD'S DINING ROOM"
        },
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 69,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 70,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          }
        ]
      },
      {
        'scene_number': 71,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 72,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 73,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': []
      },
      {
        'scene_number': 74,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 75,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 76,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 77,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 78,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S OFFICE"
        },
        'characters': []
      },
      {
        'scene_number': 79,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION A'
        },
        'characters': []
      },
      {
        'scene_number': 80,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 81,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 82,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 83,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 37,
          'location': "RENAULT'S APARTMENT BUILDING"
        },
        'characters': []
      },
      {
        'scene_number': 84,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "RENAULT'S APARTMENT BUILDING"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 85,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "INT. RENAULT'S APARTMENT"
        },
        'characters': []
      },
      {
        'scene_number': 86,
        'heading': {
          'int_ext': 'EXT',
          'time': 'NIGHT'
        },
        'characters': []
      },
      {
        'scene_number': 87,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "INT. RENAULT'S APARTMENT BUILDING"
        },
        'characters': []
      },
      {
        'scene_number': 88,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 89,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 37,
          'location': "RENAULT'S APARTMENT BUILDING"
        },
        'characters': []
      },
      {
        'scene_number': 90,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "RENAULT'S APARTMENT"
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 91,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          }
        ]
      },
      {
        'scene_number': 92,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'RIVERBANK'
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 93,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 94,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS CLEARING'
        },
        'characters': []
      },
      {
        'scene_number': 95,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 96,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 97,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': []
      },
      {
        'scene_number': 98,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          }
        ]
      },
      {
        'scene_number': 99,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "JACQUES RENAULT'S APARTMENT"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOISE'
          }
        ]
      },
      {
        'scene_number': 100,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 101,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 102,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 103,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 104,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOISE'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          }
        ]
      },
      {
        'scene_number': 105,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'PRISON CORRIDOR'
        },
        'characters': [
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          }
        ]
      }
    ],
    'episode_description': "Amazingly, both Cooper and Sheriff Truman manage to locate the one-armed man from Cooper's dream. Meanwhile, Josie Packard follows Ben and Catherine as the couple's conspiracy to destroy the Packard Saw Mill develops, and Josie then receives a strange message from soon-to-be-paroled Hank Jennings."
  },
  {
    'episode_title': 'Episode 5',
    'episode_subtitle': "Cooper's Dreams",
    'episode_number': 5,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 118,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'TRUDY',
            'character_group': 7,
            'raw_character_name': 'TRUDY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 2,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 118,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'TRUDY',
            'character_group': 7,
            'raw_character_name': 'TRUDY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 122,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'WAITRESS',
            'character_group': 7,
            'raw_character_name': 'WAITRESS'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 3,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          }
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL OFFICE'
        },
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 128,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'TERRY',
            'character_group': 7,
            'raw_character_name': 'TERRY'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 6,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'APARTMENT BUILDING'
        },
        'characters': []
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "JACQUES RENAULT'S APARTMENT"
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 9,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          }
        ]
      },
      {
        'scene_number': 10,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          }
        ]
      },
      {
        'scene_number': 11,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          }
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': 'JOHNSON HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "JOHNSON'S KITCHEN"
        },
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 14,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 15,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 16,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 17,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 10,
          'location': "BIG ED'S GAS FARM"
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'GAS FARM GARAGE'
        },
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 20,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          }
        ]
      },
      {
        'scene_number': 22,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          }
        ]
      },
      {
        'scene_number': 23,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': "HORNE'S DEPARTMENT STORE",
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 32,
          'location': "HORNE'S DEPARTMENT STORE"
        },
        'characters': []
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': "HORNE'S DEPARTMENT STORE",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 32,
          'location': "HORNE'S DEPARTMENT STORE EMPLOYMENT OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 8,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'BATTIS',
            'character_group': 3,
            'raw_character_name': 'BATTIS'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 26,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 8,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'BATTIS',
            'character_group': 3,
            'raw_character_name': 'BATTIS'
          }
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          },
          {
            'standard_character_id': 8,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'BATTIS',
            'character_group': 3,
            'raw_character_name': 'BATTIS'
          }
        ]
      },
      {
        'scene_number': 28,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'GAZEBO'
        },
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 30,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'JACQUES RENAULT APT',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 37,
          'location': "JACQUES RENAULT'S APARTMENT/CORRIDOR"
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 34,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 35,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 36,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 37,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 39,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          }
        ]
      },
      {
        'scene_number': 40,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          }
        ]
      },
      {
        'scene_number': 41,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          },
          {
            'standard_character_id': 36,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/cf/Donna-Portal.jpg',
            'standard_character_name': 'DONNA',
            'character_group': 2,
            'raw_character_name': 'DONNA'
          },
          {
            'standard_character_id': 62,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/3/3c/James-Portal.jpg',
            'standard_character_name': 'JAMES',
            'character_group': 2,
            'raw_character_name': 'JAMES'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          },
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          }
        ]
      },
      {
        'scene_number': 42,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          },
          {
            'standard_character_id': 97,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/4/4f/Norma-Portal.jpg',
            'standard_character_name': 'NORMA',
            'character_group': 8,
            'raw_character_name': 'NORMA'
          }
        ]
      },
      {
        'scene_number': 43,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 44,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'DR JACOBY',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 39,
          'location': "DR. JACOBY'S OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 18,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/2/2e/Garland-Portal.jpg',
            'standard_character_name': 'MAJOR BRIGGS',
            'character_group': 6,
            'raw_character_name': 'MAJOR BRIGGS'
          },
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 46,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          },
          {
            'standard_character_id': 18,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/2/2e/Garland-Portal.jpg',
            'standard_character_name': 'MAJOR BRIGGS',
            'character_group': 6,
            'raw_character_name': 'MAJOR BRIGGS'
          }
        ]
      },
      {
        'scene_number': 47,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 48,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 49,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 14,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/b6/Bobby-Portal.jpg',
            'standard_character_name': 'BOBBY',
            'character_group': 2,
            'raw_character_name': 'BOBBY'
          }
        ]
      },
      {
        'scene_number': 50,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': []
      },
      {
        'scene_number': 51,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 52,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          }
        ]
      },
      {
        'scene_number': 53,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': []
      },
      {
        'scene_number': 54,
        'heading': {
          'standard_location_name': 'LOG LADY CABIN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 47,
          'location': 'LOG LADYS CABIN'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 55,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 80,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d7/Log-Portal.jpg',
            'standard_character_name': 'LOG LADY',
            'character_group': 4,
            'raw_character_name': 'LOG LADY'
          }
        ]
      },
      {
        'scene_number': 56,
        'heading': {
          'standard_location_name': 'LOG LADY CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 47,
          'location': "LOG LADY'S CABIN"
        },
        'characters': [
          {
            'standard_character_id': 80,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d7/Log-Portal.jpg',
            'standard_character_name': 'LOG LADY',
            'character_group': 4,
            'raw_character_name': 'LOG LADY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 57,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 80,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d7/Log-Portal.jpg',
            'standard_character_name': 'LOG LADY',
            'character_group': 4,
            'raw_character_name': 'LOG LADY'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 58,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 80,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d7/Log-Portal.jpg',
            'standard_character_name': 'LOG LADY',
            'character_group': 4,
            'raw_character_name': 'LOG LADY'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 59,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 80,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d7/Log-Portal.jpg',
            'standard_character_name': 'LOG LADY',
            'character_group': 4,
            'raw_character_name': 'LOG LADY'
          }
        ]
      },
      {
        'scene_number': 60,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 61,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS SECOND CABIN'
        },
        'characters': []
      },
      {
        'scene_number': 62,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'SECOND CABIN'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 63,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          }
        ]
      },
      {
        'scene_number': 64,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 65,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 66,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'BANQUET ROOM ENTRANCE'
        },
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 67,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 18,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/2/2e/Garland-Portal.jpg',
            'standard_character_name': 'MAJOR BRIGGS',
            'character_group': 6,
            'raw_character_name': 'MAJOR BRIGGS'
          },
          {
            'standard_character_id': 42,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/18/Einar-Portal.jpg',
            'standard_character_name': 'EINER',
            'character_group': 7,
            'raw_character_name': 'EINER'
          }
        ]
      },
      {
        'scene_number': 68,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 42,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/18/Einar-Portal.jpg',
            'standard_character_name': 'EINER',
            'character_group': 7,
            'raw_character_name': 'EINER'
          },
          {
            'standard_character_id': 18,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/2/2e/Garland-Portal.jpg',
            'standard_character_name': 'MAJOR BRIGGS',
            'character_group': 6,
            'raw_character_name': 'MAJOR BRIGGS'
          }
        ]
      },
      {
        'scene_number': 69,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 56,
            'character_image': 'https://upload.wikimedia.org/wikipedia/commons/8/83/David_face.png',
            'standard_character_name': 'HEBA',
            'character_group': 7,
            'raw_character_name': 'HEBA'
          }
        ]
      },
      {
        'scene_number': 70,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 71,
        'heading': {
          'standard_location_name': 'MOTEL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 17,
          'location': 'TIMBER ROOM ENTRANCE'
        },
        'characters': [
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          },
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 72,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 73,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HOTEL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 74,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HOTEL WIRING CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 75,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          }
        ]
      },
      {
        'scene_number': 76,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          }
        ]
      },
      {
        'scene_number': 77,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 22,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/a3/Catherine-Portal.jpg',
            'standard_character_name': 'CATHERINE',
            'character_group': 5,
            'raw_character_name': 'CATHERINE'
          },
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 78,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HOTEL CORRIDOR'
        },
        'characters': [
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          }
        ]
      },
      {
        'scene_number': 79,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          }
        ]
      },
      {
        'scene_number': 80,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 81,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 82,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 83,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 84,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 85,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 86,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 87,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 88,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 89,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADELEINE'
          }
        ]
      },
      {
        'scene_number': 90,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 91,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 68,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/0/0a/Josie-Portal2.jpg',
            'standard_character_name': 'JOSIE',
            'character_group': 5,
            'raw_character_name': 'JOSIE'
          }
        ]
      },
      {
        'scene_number': 92,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          }
        ]
      },
      {
        'scene_number': 93,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 94,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "JOHNSON'S HOUSE KITCHEN"
        },
        'characters': []
      },
      {
        'scene_number': 95,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 52,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/5/59/Hank-Portal.jpg',
            'standard_character_name': 'HANK',
            'character_group': 8,
            'raw_character_name': 'HANK'
          },
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          }
        ]
      },
      {
        'scene_number': 96,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 97,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': 'JOHNSON KITCHEN'
        },
        'characters': [
          {
            'standard_character_id': 76,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/e/eb/Leo-Portal.jpg',
            'standard_character_name': 'LEO',
            'character_group': 3,
            'raw_character_name': 'LEO'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 98,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 99,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S ROOM"
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      }
    ],
    'episode_description': "Cooper, Truman, Deputy Hawk, and Doc Hayward venture into the woods for a revelatory encounter with the Log Lady and find the location of Jacques Renault's cabin. In the meantime, Audrey continues her efforts to assist Cooper by taking a job at her father's department store, while Donna and James Hurley pursue their own line of inquiry into Laura's death by taking Maddy into their confidence. Elsewhere, Leo's battered wife Shelly decides to get revenge."
  },
  {
    'episode_title': 'Episode 8',
    'episode_subtitle': 'May the Giant Be with You',
    'episode_number': 8,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': [
          {
            'standard_character_id': 121,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/6/6c/Waiter-Portal.jpg',
            'standard_character_name': 'WAITER',
            'character_group': 7,
            'raw_character_name': 'WAITER'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 4,
        'heading': {},
        'characters': [
          {
            'standard_character_id': 49,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/d/d4/Giant-Portal.jpg',
            'standard_character_name': 'GIANT',
            'character_group': 4,
            'raw_character_name': 'GIANT'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S BEDROOM"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 6,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/7/7e/Audrey-Portal.jpg',
            'standard_character_name': 'AUDREY',
            'character_group': 2,
            'raw_character_name': 'AUDREY'
          }
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "BLACKIE'S OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 13,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/a/ad/Blackie-Portal.jpg',
            'standard_character_name': 'BLACKIE',
            'character_group': 3,
            'raw_character_name': 'BLACKIE'
          }
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'MILL',
          'time': 'DAWN',
          'int_ext': 'EXT',
          'standard_location_id': 34,
          'location': 'BURNED MILL'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'MILL',
          'time': 'DAWN',
          'int_ext': 'INT',
          'standard_location_id': 34,
          'location': 'MILL'
        },
        'characters': []
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'MILL',
          'time': 'DAWN',
          'int_ext': 'EXT',
          'standard_location_id': 34,
          'location': 'MILL'
        },
        'characters': [
          {
            'standard_character_id': 99,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/b/be/Pete-Portal.jpg',
            'standard_character_name': 'PETE',
            'character_group': 5,
            'raw_character_name': 'PETE'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 2,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/5/59/Andy-Portal.jpg',
            'standard_character_name': 'ANDY',
            'character_group': 1,
            'raw_character_name': 'ANDY'
          }
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAWN',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S ROOM"
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 15,
          'location': 'CALHOUN MEMORIAL HOSPITAL'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'CALHOUN HOSPITAL INTENSIVE CARE'
        },
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 82,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/c/cf/Lucy-Portal.jpg',
            'standard_character_name': 'LUCY',
            'character_group': 1,
            'raw_character_name': 'LUCY'
          }
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL ROOM'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 107,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/c/c3/Shelly-Portal.jpg',
            'standard_character_name': 'SHELLY',
            'character_group': 2,
            'raw_character_name': 'SHELLY'
          }
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': [
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          },
          {
            'standard_character_id': 12,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/6/69/BigEd-Portal.jpg',
            'standard_character_name': 'ED',
            'character_group': 8,
            'raw_character_name': 'ED'
          },
          {
            'standard_character_id': 35,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/1b/DocHayward-Portal.jpg',
            'standard_character_name': 'DOC HAYWARD',
            'character_group': 6,
            'raw_character_name': 'HAYWARD'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          }
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER LIVING ROOM'
        },
        'characters': [
          {
            'standard_character_id': 83,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/2/26/Maddy-Portal2.jpg',
            'standard_character_name': 'MADELEINE',
            'character_group': 2,
            'raw_character_name': 'MADDY'
          },
          {
            'standard_character_id': 106,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/c/c1/Sarah-Portal.jpg',
            'standard_character_name': 'SARAH',
            'character_group': 6,
            'raw_character_name': 'SARAH'
          }
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          {
            'standard_character_id': 9,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/6/6f/Ben-Portal2.jpg',
            'standard_character_name': 'BENJAMIN',
            'character_group': 3,
            'raw_character_name': 'BEN'
          },
          {
            'standard_character_id': 66,
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/e/e2/Jerry-Portal.jpg',
            'standard_character_name': 'JERRY',
            'character_group': 3,
            'raw_character_name': 'JERRY'
          },
          {
            'standard_character_id': 75,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/2/23/Leland-Portal.jpg',
            'standard_character_name': 'LELAND',
            'character_group': 6,
            'raw_character_name': 'LELAND'
          }
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          {
            'standard_character_id': 55,
            'character_image': 'http://vignette2.wikia.nocookie.net/twinpeaks/images/a/ac/Hawk-Portal.jpg',
            'standard_character_name': 'HAWK',
            'character_group': 1,
            'raw_character_name': 'HAWK'
          },
          {
            'standard_character_id': 29,
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/b/bb/Cooper-Portal.jpg',
            'standard_character_name': 'COOPER',
            'character_group': 1,
            'raw_character_name': 'COOPER'
          },
          {
            'standard_character_id': 119,
            'character_image': 'http://vignette4.wikia.nocookie.net/twinpeaks/images/1/14/Truman-Portal.jpg',
            'standard_character_name': 'TRUMAN',
            'character_group': 1,
            'raw_character_name': 'TRUMAN'
          }
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S"
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S PORCH"
        },
        'characters': [
          'ANDY',
          'ALBERT'
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': [
          'TRUMAN'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': []
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER KITCHEN'
        },
        'characters': [
          'NORMA',
          'HANK'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'MADDY',
          'DONNA',
          'NORMA'
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          'MADDY'
        ]
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S BEDROOM"
        },
        'characters': [
          'AUDREY'
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "BLACKIE'S OFFICE,"
        },
        'characters': [
          'AUDREY',
          'BLACKIE'
        ]
      },
      {
        'scene_number': 35,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'ALBERT',
          'COOPER',
          'ANDY'
        ]
      },
      {
        'scene_number': 37,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION RECEPTION"
        },
        'characters': [
          'LUCY',
          'ALBERT',
          'GIRARD',
          'TOM',
          'LUCE'
        ]
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM'
        },
        'characters': [
          'TRUMAN',
          'JAMES',
          'COOPER'
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION RECEPTION/CONFERENCE ROOM"
        },
        'characters': [
          'COOPER',
          'LUCY',
          'ANDY'
        ]
      },
      {
        'scene_number': 40,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION HOLDING CELL AREA"
        },
        'characters': [
          'DONNA',
          'JAMES'
        ]
      },
      {
        'scene_number': 41,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 42,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL ROOM'
        },
        'characters': [
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 43,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': [
          'COOPER TRUMAN',
          'TRUMAN COOPER',
          'ALBERT',
          'COOPER',
          'HAYWARD',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 44,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'INTENSIVE HOSPITAL ROOM'
        },
        'characters': [
          'ED',
          'COOPER',
          'ALBERT'
        ]
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 46,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL ROOM'
        },
        'characters': [
          'JACOBY',
          'HAYWARD',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 47,
        'heading': {
          'standard_location_name': 'WOODS',
          'int_ext': 'EXT',
          'location': 'WOODS',
          'standard_location_id': 22
        },
        'characters': []
      },
      {
        'scene_number': 48,
        'heading': {},
        'characters': [
          'JACOBY',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 49,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'NORMA',
          'SHELLY'
        ]
      },
      {
        'scene_number': 50,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'BOBBY',
          'MAJOR BRIGGS',
          'HANK',
          'NORMA'
        ]
      },
      {
        'scene_number': 51,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 52,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 53,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 54,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION CONFERENCE ROOM"
        },
        'characters': [
          'COOPER',
          'LUCY'
        ]
      },
      {
        'scene_number': 55,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 56,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'ALBERT',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 57,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER LIVING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 58,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'ROAD'
        },
        'characters': []
      },
      {
        'scene_number': 59,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 60,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'ROAD'
        },
        'characters': []
      },
      {
        'scene_number': 61,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'ALBERT'
        ]
      },
      {
        'scene_number': 62,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'ROAD'
        },
        'characters': []
      },
      {
        'scene_number': 63,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'ALBERT',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 64,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'TRAIN CAR'
        },
        'characters': []
      },
      {
        'scene_number': 65,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'ALBERT',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 66,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'int_ext': 'EXT',
          'location': 'BLACK LAKE',
          'standard_location_id': 29
        },
        'characters': []
      },
      {
        'scene_number': 67,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'ANDY',
          'ALBERT',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 68,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 69,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE. LODGE'
        },
        'characters': [
          'PETE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 70,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL LOBBY'
        },
        'characters': [
          'ASIAN MAN',
          'TRUMAN',
          'JERRY',
          'BEN'
        ]
      },
      {
        'scene_number': 71,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'JERRY',
          'BEN',
          'HANK'
        ]
      },
      {
        'scene_number': 72,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 73,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'LELAND',
          'SARAH',
          'MADDY',
          'DONNA'
        ]
      },
      {
        'scene_number': 74,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': "HAYWARD'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 75,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': "HAYWARD'S HOUSE"
        },
        'characters': [
          'EILEEN',
          'SARAH',
          'LELAND',
          'DOC'
        ]
      },
      {
        'scene_number': 76,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': []
      },
      {
        'scene_number': 77,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'AUDREY'
        ]
      },
      {
        'scene_number': 78,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S ROOM"
        },
        'characters': [
          'COOPER',
          'GIANT'
        ]
      },
      {
        'scene_number': 79,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 80,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'int_ext': 'INT',
          'location': 'HOSPITAL ROOM',
          'standard_location_id': 15
        },
        'characters': []
      },
      {
        'scene_number': 81,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 82,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL ROOM'
        },
        'characters': []
      }
    ],
    'episode_description': "As Cooper lies bleeding from a serious gunshot wound, he has a vision of a mysterious giant who helps him with the investigation. Albert Rosenfield arrives in Twin Peaks the next morning to assist Cooper and to investigate his attack. Meanwhile, Leland Palmer's hair has suddenly turned white and he continues to act unusually. James remains in jail after being framed by Bobby, who plants Leo's stash of cocaine in James's motorcycle. Big Ed maintains a close watch on Nadine, who, after a suicide attempt, is left in a comatose state. Leo also remains in a coma after being shot by Hank. The sawmill burns down, leaving Catherine and Josie missing and Shelly and Pete in the hospital after barely escaping the fire. Donna, after receiving some advice from the Log Lady, decides to look into the Meals on Wheels that Laura worked at."
  },
  {
    'episode_title': 'Episode 9',
    'episode_subtitle': 'Coma',
    'episode_number': 9,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': [
          'COOPER',
          'ALBERT'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 15,
          'location': 'HOSPITAL'
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': "RONETTE PULASKI'S HOSPITAL ROOM"
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': []
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': [
          'AUDREY',
          'NANCY',
          'READING GIRL'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'APARTMENT HOUSE'
        },
        'characters': [
          'DONNA',
          'VOICE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'TREMOND HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 23,
          'location': 'TREMOND APARTMENT'
        },
        'characters': [
          'TREMOND',
          'DONNA'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'APARTMENT HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'JERRY'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'PETE',
          'TRUMAN',
          'ALBERT',
          'COOPER'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE KITCHEN'
        },
        'characters': [
          'PETE'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'ALBERT',
          'COOPER',
          'PETE'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE R DINER'
        },
        'characters': [
          'LELAND',
          'MADDY',
          'NORMA'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'NORMA',
          'HANK'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE R DINER'
        },
        'characters': [
          'LELAND',
          'MADDY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE R DINER'
        },
        'characters': [
          'LOG LADY',
          'MAJOR BRIGGS'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'LUCY',
          'ANDY'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'HANK',
          'COOPER'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'BEN',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL ROOM'
        },
        'characters': [
          'HAYWARD',
          'SHELLY'
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL LOBBY'
        },
        'characters': []
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'JERRY',
          'BEN',
          'LELAND'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': []
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S CORRIDOR"
        },
        'characters': [
          'AUDREY'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': 'ONE-EYED JACKS ROOM'
        },
        'characters': [
          'BATTIS',
          'AUDREY',
          'BATTIS '
        ]
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'DONNA'
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE CORRIDOR'
        },
        'characters': [
          'JAMES',
          'DONNA'
        ]
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'DONNA'
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD LIVING ROOM'
        },
        'characters': [
          'JAMES',
          'DONNA'
        ]
      },
      {
        'scene_number': 35,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'SHELLY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 37,
        'heading': {},
        'characters': [
          'COOPER',
          'BRIGGS'
        ]
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "INT. COOPER'S HOTEL ROOM"
        },
        'characters': [
          'COOPER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': 'ONE-EYED JACKS'
        },
        'characters': [
          'BLACKIE'
        ]
      }
    ],
    'episode_description': "In the midst of the murder investigation and the aftermath of his shooting, Cooper receives the grim news that his insane former partner, Windom Earle, has escaped from a mental asylum. Meanwhile, Donna's first day as a Meals on Wheels volunteer leads to an eerie meeting with an old woman and her grandson. Audrey uncovers more about Laura's double life at One Eyed Jacks, while her investigation becomes increasingly dangerous."
  },
  {
    'episode_title': 'Episode 10',
    'episode_subtitle': 'The Man Behind Glass',
    'episode_number': 10,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAWN',
          'int_ext': 'EXT',
          'standard_location_id': 15,
          'location': 'TWIN PEAKS HOSPITAL'
        },
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': "RONETTE PULASKI'S HOSPITAL ROOM"
        },
        'characters': [
          'TRUMAN',
          'ALBERT',
          'COOPER'
        ]
      },
      {
        'scene_number': 3,
        'heading': {},
        'characters': [
          'COOPER',
          'TRUMAN',
          'ALBERT'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'int_ext': 'EXT',
          'location': "HAROLD SMITH'S APARTMENT",
          'standard_location_id': 6
        },
        'characters': [
          'SMITH',
          'DONNA'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "SMITH'S APARTMENT"
        },
        'characters': [
          'SMITH',
          'DONNA'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'time': 'DAY'
        },
        'characters': []
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'ALBERT'
        ]
      },
      {
        'scene_number': 8,
        'heading': {},
        'characters': [
          'COOPER',
          'JAMES',
          'LUCY',
          'HAWK',
          'TREMAYNE',
          'PALMER'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'HAWK',
          'LELAND'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'BEN',
          'COOPER'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': 'ROOM AT ONE-EYED JACKS'
        },
        'characters': [
          'BLACKIE',
          'BATTIS'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'TREMAYNE',
          'LUCY',
          '20% employee discount and I am going right back after'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER BOOTH'
        },
        'characters': [
          'JAMES',
          'MADDY',
          'DONNA'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'GERARD',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'RECEPTION AREA'
        },
        'characters': [
          'TRUMAN',
          'GERARD',
          'COOPER'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'SHELLY',
          'COOPER',
          'TRUMAN AND SHELLY'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION BATHROOM"
        },
        'characters': [
          'GERARD'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': 'ONE-EYED JACKS BEDROOM'
        },
        'characters': [
          'JEAN',
          'AUDREY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "BLACKIE'S OFFICE"
        },
        'characters': [
          'BLACKIE',
          'BATTIS',
          'JEAN',
          'NANCY'
        ]
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': [
          'TRUMAN',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'BATHROOM'
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'JAMES HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 36,
          'location': "JAMES HURLEY'S HOME"
        },
        'characters': [
          'JAMES',
          'COLLEEN'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'HOSPITAL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 15,
          'location': 'HOSPITAL'
        },
        'characters': [
          'ED',
          'HAYWARD',
          'DOC',
          'NADINE'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'TRUMAN',
          'JACOBY',
          'COOPER'
        ]
      },
      {
        'scene_number': 26,
        'heading': {},
        'characters': [
          'JACOBY'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'CEMETERY',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 46,
          'location': 'THE CEMETERY'
        },
        'characters': [
          'DONNA'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': "PALMER'S HOUSE"
        },
        'characters': [
          'MADDY',
          'JAMES',
          'DONNA'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'STREET'
        },
        'characters': [
          'JAMES'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'MADDY',
          'LELAND',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S APARTMENT"
        },
        'characters': [
          'DONNA',
          'SMITH',
          'HAROLD'
        ]
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': []
      }
    ],
    'episode_description': "Blackie holds Audrey hostage, and plots with Jean Renault; James and Madeleine become close, to Donna's dismay; Lucy lunches with Dick Tremayne; Dr. Jacoby undergoes hypnosis, leading to an arrest; and Nadine wakes from her coma a changed woman; Donna finds a diary of Laura's at Harold Smith's house."
  },
  {
    'episode_title': 'Episode 11',
    'episode_subtitle': "Laura's Secret Diary",
    'episode_number': 11,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S INTERROGATION ROOM"
        },
        'characters': [
          'LELAND',
          'VOICE',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION HALLWAY"
        },
        'characters': [
          'COOPER',
          'HAYWARD'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S RECEPTION AREA"
        },
        'characters': [
          'BRENNAN',
          'HAYWARD',
          'ANDY',
          'ANDY '
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION HALLWAY"
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'RECEPTION'
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'INT. HALLWAY'
        },
        'characters': [
          'COOPER',
          'ANDY',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL LOBBY'
        },
        'characters': [
          'CLERK',
          'BEN',
          'DESK CLERK',
          'HORNE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'RENAULT',
          'BEN'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE R DINER'
        },
        'characters': [
          'HANK',
          'DONNA',
          'NORMA',
          'NORM'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'SMITH',
          'DONNA'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'COOPER',
          'HORNE'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'THE BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {
          'time': 'DAY'
        },
        'characters': [
          'PETE',
          'JOSIE',
          'PETE '
        ]
      },
      {
        'scene_number': 16,
        'heading': {},
        'characters': [
          'JOSIE'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S OFFICE"
        },
        'characters': [
          'BATTIS',
          'AUDREY',
          'RENAULT'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'HAYWARD',
          'DONNA'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'RECEPTION AREA'
        },
        'characters': [
          'ANDY',
          'LUCY',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'NORMA',
          'HANK',
          'MAN'
        ]
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': [
          'MADDY',
          'DONNA',
          'DARYL LODWICK'
        ]
      },
      {
        'scene_number': 22,
        'heading': {},
        'characters': [
          'JOSIE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S RECEPTION AREA"
        },
        'characters': [
          'STERNWOOD',
          'LUCY',
          'TRUMAN',
          'COOPER',
          'TREYMAYNE'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'LELAND',
          'STERNWOOD',
          'STERNWOOD '
        ]
      },
      {
        'scene_number': 26,
        'heading': {},
        'characters': [
          'PETE',
          'JONATHAN',
          'JOSIE'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'HANK',
          'JONATHAN'
        ]
      }
    ],
    'episode_description': "Cooper and Truman arrest Leland after he confesses to the crime of murdering Jacques Renault in the hospital as well as attacking Dr. Jacoby while being disoriented. Hank asks Norma to tidy up the Double R Diner when he is informed that a shady food critic named M.T. Wentz may be visiting Twin Peaks. Meanwhile, Jean Renault sends a videotape of Audrey Horne being held captive to Ben, demanding a $125,000 ransom for her return, and Cooper to be the drop-off man. Jean murders Emory Battis, upon returning to One-Eyed Jacks, for mistreating Audrey. With help from Truman, Cooper investigates Audrey's kidnapping. Josie returns, claiming to have been in Seattle on business, learning from Pete that Catherine died in the sawmill fire. Later, a Japanese businessman, Mr. Tojamura, checks into the Great Northern Hotel."
  },
  {
    'episode_title': 'Episode 12',
    'episode_subtitle': "The Orchid's Curse",
    'episode_number': 12,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'MORNING',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S HOTEL ROOM"
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          'TRUMAN',
          'HAWK',
          'LUCY',
          'COOPER'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S LIVING ROOM"
        },
        'characters': [
          'PINKLE',
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'STERNWOOD',
          'TRUMAN',
          'HORNE',
          'COOPER',
          'LODWICK'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'STERNWOOD',
          'LODWICK',
          'TRUMAN',
          'ANDY'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S APARTMENT"
        },
        'characters': []
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S APARTMENT"
        },
        'characters': [
          'HAROLD',
          'DONNA'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'RACINE',
          'STERNWOOD',
          'LODWICK',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': [
          'JAMES',
          'NADINE',
          'ED'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'DESK INTERCOM',
          'BEN',
          'TOJAMURA'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'TOJAMURA',
          'HANK',
          'COOPER'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R'
        },
        'characters': [
          'DONNA',
          'MADDY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': [
          'RENAULT',
          'BLACKIE',
          'NANCY'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLER DINER'
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'NORMA',
          'JAMES',
          'MADDY',
          'HANK'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION RECEPTION AREA"
        },
        'characters': [
          'ANDY'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'HAWK',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 26,
        'heading': {},
        'characters': [
          'VOICE ON PHONE'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S APARTMENT"
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S LIVING ROOM"
        },
        'characters': [
          'HAROLD',
          'DONNA'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S GREENHOUSE"
        },
        'characters': [
          'DONNA',
          'HAROLD'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': [
          'HANK'
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'AROUND BACK'
        },
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S"
        },
        'characters': []
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S HALLWAY"
        },
        'characters': []
      },
      {
        'scene_number': 35,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S HALLWAY"
        },
        'characters': [
          'COOPER',
          'NANCY'
        ]
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "BLACKIE'S OFFICE"
        },
        'characters': [
          'BLACKIE',
          'RENAULT'
        ]
      },
      {
        'scene_number': 37,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S HALLWAY"
        },
        'characters': []
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S BEDROOM"
        },
        'characters': [
          'NANCY',
          'COOPER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "BLACKIE'S OFFICE"
        },
        'characters': []
      },
      {
        'scene_number': 40,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'int_ext': 'INT',
          'location': "ONE-EYED JACK'S",
          'standard_location_id': 7
        },
        'characters': [
          'BODYGUARD',
          'HAWK'
        ]
      },
      {
        'scene_number': 41,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'THE HIGH RIDGE'
        },
        'characters': [
          'HANK'
        ]
      },
      {
        'scene_number': 42,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S LIVING ROOM"
        },
        'characters': []
      },
      {
        'scene_number': 43,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': 'GREENHOUSE'
        },
        'characters': [
          'DONNA',
          'HAROLD'
        ]
      },
      {
        'scene_number': 44,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S LIVING ROOM"
        },
        'characters': []
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': 'GREENHOUSE'
        },
        'characters': [
          'DONNA'
        ]
      },
      {
        'scene_number': 46,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S LIVING ROOM"
        },
        'characters': [
          'HAROLD'
        ]
      }
    ],
    'episode_description': "Cooper and Truman stage a raid on One Eyed Jacks; Leland's court hearing begins; Donna and Madeleine plot to steal Laura's secret diary from Harold Smith; Ben gets a business proposition from the mysterious Mr. Tojamura; and Shelly and Bobby reignite their relationship, even as the catatonic Leo lives under the same roof."
  },
  {
    'episode_title': 'Episode 13',
    'episode_subtitle': 'Demons',
    'episode_number': 13,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S HOUSE"
        },
        'characters': [
          'SMITH',
          'DONNA',
          'MADDY',
          'JAMES'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S HOUSE"
        },
        'characters': [
          'JAMES',
          'DONNA'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 20,
          'location': 'THE BOOKHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 20,
          'location': 'THE BOOKHOUSE'
        },
        'characters': [
          'CAPPY',
          'COOPER',
          'HAWK',
          'AUDREY'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'CITY STREET'
        },
        'characters': [
          'DONNA',
          'JAMES'
        ]
      },
      {
        'scene_number': 7,
        'heading': {},
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': [
          'BEN',
          'COOPER'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'BROCKMAN',
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM'
        },
        'characters': [
          'TRUMAN',
          'DONNA',
          'COLE'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'TRUMAN',
          'COLE',
          'REPORT FROM ALBERT ON THE ONE',
          'DOWN THE TRAIN TRACKS FROM THE',
          'MIKE'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 20,
          'location': 'BOOKHOUSE'
        },
        'characters': [
          'COOPER',
          'BEN',
          'AUDREY',
          'AUDREY '
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': "ED HURLEY'S LIVING ROOM"
        },
        'characters': [
          'NADINE',
          'ED'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE LIBRARY'
        },
        'characters': [
          'JONATHAN',
          'JOSIE'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 38,
          'location': 'LAKE'
        },
        'characters': [
          'JAMES',
          'MADDY'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'int_ext': 'INT',
          'location': "BEN HORNE'S OFFICE",
          'standard_location_id': 5
        },
        'characters': [
          'BEN',
          'JOSIE'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'BOBBY',
          'SHELLY',
          'COLE',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'COLE'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'COOPER',
          'COLE',
          'OTHER THAN THAT THE CASE BEARS NO',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORN'S OFFICE - GREAT NORTHERN'"
        },
        'characters': [
          'BEN',
          'LELAND',
          'LELAND '
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'TRUMAN',
          'JOSIE',
          'JONATHAN'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'BEN',
          'TOJAMURA',
          'TOJOMURA',
          'LELAND',
          'PETE'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'MIKE',
          'TRUMAN',
          'COOPER'
        ]
      }
    ],
    'episode_description': 'Shelly and Bobby host a "welcome home" party for Leo; Cooper\'s boss, Gordon Cole, visits Cooper to warn him of threats from the insane Windom Earle; Josie strikes a deal with Ben; the one-armed man reveals some information about BOB; and Leland returns to work.'
  },
  {
    'episode_title': 'Episode 14',
    'episode_subtitle': 'Lonely Souls',
    'episode_number': 14,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': [
          'TRUMAN',
          'COOPER',
          'HAWK',
          'COLE'
        ]
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S APARTMENT"
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "HAROLD SMITH'S APARTMENT"
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'HAROLD SMITH HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': "SMITH'S APARTMENT"
        },
        'characters': [
          'COOPER',
          'GERARD',
          'TRUMAN',
          'HAWK'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'SARAH',
          'LELAND',
          'MADDY'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'SHELLY',
          'BOBBY',
          'LEO'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'HAWK',
          'HAYWARD',
          'COOPER '
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL LOBBY'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HOTEL CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HOTEL LOBBY'
        },
        'characters': [
          'COOPER',
          'HAYWARD',
          'GERARD',
          'TRUMAN',
          'HORNE'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'AUDREY'
        ]
      },
      {
        'scene_number': 16,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'NORMA',
          'SHELLY',
          'NADINE',
          'ED'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S"
        },
        'characters': [
          'BOBBY',
          'MIKE',
          'LEO'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'HAWK',
          'TRUMAN',
          'PETE'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "TRUMAN'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'PETE'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'COOPER',
          'AUDREY',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          '25- INT. PALMER HOUSE - NIGHT'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'MADELEINE'
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'HORNE',
          'TOJAMURA',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'PETE',
          'TOJAMURA'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'TRUMAN',
          'LOG LADY',
          'COOPER'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'DONNA',
          'JAMES',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          'GIANT',
          'TRUMAN',
          'COOPER'
        ]
      }
    ],
    'episode_description': "Ben is brought in for questioning after Audrey confronts him about One Eyed Jacks and passes the information to Cooper; Andy ponders the meaning of Harold Smith's suicide note; financial pressures strain Shelly and Bobby's brief happiness; Pete learns Tojamura's plans; Ed's life continues to bewilder, as amnesiac Nadine decides she is a teenager; the Log Lady leads Cooper to the Roadhouse, and a devastating message; and Laura's killer is finally revealed."
  },
  {
    'episode_title': 'Episode 15',
    'episode_subtitle': 'Drive with a Dead Girl',
    'episode_number': 15,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'MORNING',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE LIVING ROOM'
        },
        'characters': [
          'DONNA',
          'LELAND',
          'JAMES'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'CAR IN TRANSIT',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 27,
          'location': "LELAND'S CAR"
        },
        'characters': [
          'LELAND'
        ]
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          'NORMA',
          'VIVIAN',
          'ERNIE'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'LELAND'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'JAIL'
        },
        'characters': [
          'BEN',
          'JERRY'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'GWEN',
          'LUCY',
          'HAWK'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM'
        },
        'characters': [
          'HAYWARD',
          'JERRY',
          'BEN',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL ROOM'
        },
        'characters': [
          'MIKE'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HALLWAY'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'HANK',
          'NORMA',
          'VIVIAN'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "TRUMAN'S OFFICE"
        },
        'characters': [
          'PETE',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'ANDY',
          'LUCY'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'JAIL'
        },
        'characters': [
          'BEN',
          'PETE'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'STREET',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 41,
          'location': 'ROAD'
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'CAR IN TRANSIT',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 27,
          'location': 'CAR'
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {
          'time': 'DAY'
        },
        'characters': [
          'ED',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'int_ext': 'INT',
          'location': "SHERIFF'S STATION",
          'standard_location_id': 9
        },
        'characters': [
          'GWEN',
          'ANDY',
          'LUCY'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INTERROGATION ROOM'
        },
        'characters': [
          'GERARD',
          'JERRY',
          'TRUMAN',
          'BEN',
          'COOPER'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'DOWNSTAIRS CORRIDOR'
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': [
          'VIVIAN',
          'ERNIE',
          'HANK',
          'NORMA'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HALLWAY GREAT NORTHERN'
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S ROOM"
        },
        'characters': [
          'COOPER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': [
          'TRUMAN'
        ]
      }
    ],
    'episode_description': "Jerry tries to arrange a defense for Ben, who is in jail for Laura's murder. Cooper is skeptical of Ben committing the crime, which Truman contradicts. Later, Pete visits Ben with an audio message from Catherine, who is willing to back up his alibi, on terms that he surrenders all of his property. Meanwhile, the real killer, Leland, under possession by Bob, stuffs the dead Maddie Ferguson in his golf bag, leaving more evidence to implicate Ben. Elsewhere, Norma's estranged mother Vivian Smythe, arrives for a visit with her new husband, while Hank reappears after several days. Lucy arrives back in Twin Peaks with her older sister, Gwen, where Lucy is approached by Andy who wants to get back together with her. Later, the one-armed man escapes from police custody, warning them that Bob is nearby."
  },
  {
    'episode_title': 'Episode 16',
    'episode_subtitle': 'Arbitrary Law',
    'episode_number': 16,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'PARKING LOT'
        },
        'characters': [
          'ALBERT',
          'COOPER',
          'TRUMAN',
          'HAWK'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLER DINER'
        },
        'characters': [
          'DONNA',
          'JAMES'
        ]
      },
      {
        'scene_number': 4,
        'heading': {},
        'characters': [
          'HANK',
          'ERNIE'
        ]
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          'NORMA',
          'VIVIAN'
        ]
      },
      {
        'scene_number': 6,
        'heading': {},
        'characters': [
          'ANDY',
          'DONNA',
          'JAMES'
        ]
      },
      {
        'scene_number': 7,
        'heading': {},
        'characters': [
          'DONNA',
          'COOPER',
          'ANDY',
          'WOMAN',
          'TREMOND'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'INT. GREAT NORTHERN HOTEL ROOM'
        },
        'characters': [
          'DOC',
          'COOPER',
          'GERARD'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'INT. GREAT NORTHERN HALLWAY'
        },
        'characters': [
          'WAITER',
          'COOPER'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'ALBERT'
        ]
      },
      {
        'scene_number': 11,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S OFFICE, RECEPTION AREA"
        },
        'characters': [
          'ZIPPER',
          'ANDY',
          'LUCY'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'BEN',
          'TOJOMURA',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'LELAND',
          'DONNA'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'LELAND',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'DONNA',
          'HAYWARD'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'THE ROADHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'int_ext': 'INT',
          'location': 'THE ROADHOUSE',
          'standard_location_id': 19
        },
        'characters': [
          'LELAND',
          'COOPER',
          'ED',
          'ALBERT',
          'BOBBY',
          'BEN',
          'TRUMAN',
          'BRIGGS',
          'WAITER'
        ]
      },
      {
        'scene_number': 20,
        'heading': {},
        'characters': [
          'LAURA',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'GAZEBO'
        },
        'characters': [
          'JAMES',
          'DONNA'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'INT. CONFERENCE ROOM'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "INT. SHERIFF'S STATION"
        },
        'characters': [
          'COOPER',
          'LELAND'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'DOWNSTAIRS CORRIDOR'
        },
        'characters': [
          'LELAND',
          'HAWK',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'INT. INTERROGATION'
        },
        'characters': [
          'TRUMAN',
          'BEN',
          'COOPER'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'LUCY',
          'TREMAYNE',
          'ANDY'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'INT. CORRIDOR'
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'ALBERT'
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {},
        'characters': [
          'BEN'
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'INT. CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 35,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'ALBERT',
          'TRUMAN',
          'BEN'
        ]
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'ALBERT',
          'BRIGGS'
        ]
      },
      {
        'scene_number': 37,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': []
      },
      {
        'scene_number': 38,
        'heading': {},
        'characters': []
      }
    ],
    'episode_description': "From a piece of Laura's secret diary, Cooper discovers that he and Laura shared the same dream; Catherine tricks Ben into signing away the mill; Andy and Tremayne - the potential fathers of Lucy's baby - confront each other; James leaves town; and Laura's killer is unmasked."
  },
  {
    'episode_title': 'Episode 17',
    'episode_subtitle': 'Dispute Between Brothers',
    'episode_number': 17,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'PALMER HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 8,
          'location': 'PALMER HOUSE'
        },
        'characters': [
          'HAYWARD',
          'SARAH',
          'COOPER'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'int_ext': 'INT',
          'location': 'HAYWARD HOUSE',
          'standard_location_id': 11
        },
        'characters': []
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          'HANK',
          'SARAH',
          'AUDREY',
          'EILEEN'
        ]
      },
      {
        'scene_number': 6,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 7,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'DONNA',
          'ED',
          'NADINE'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'MAJOR BRIGGS',
          'JACOBY',
          'BRIGGS',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 9,
        'heading': {},
        'characters': [
          'DWAYNE',
          'DOUGIE',
          'ED',
          'TRUMAN',
          'COOPER',
          'PETE',
          'DOC',
          'VIVIAN',
          'NORMA',
          'HANK',
          'ERNIE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL'
        },
        'characters': []
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL'
        },
        'characters': [
          'GREEGE',
          'JACOBY',
          'ED',
          'NADINE'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "GREAT NORTHERN COOPER'S ROOM"
        },
        'characters': [
          'COOPER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'CATHERINE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S RECEPTION AREA"
        },
        'characters': [
          'TREMAYNE',
          'LUCY',
          'ANDY',
          'HAWK'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'HAWK',
          'MOUNTIE',
          'TRUMAN',
          'HARDY'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'HARDY',
          'COOPER',
          'TRUMAN',
          'MOUNTIE'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': [
          'BOBBY',
          'AUDREY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BOBBY',
          'BEN'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HALL/LOBBY'
        },
        'characters': [
          'AUDREY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION CONFERENCE ROOM"
        },
        'characters': [
          'HARDY',
          'COOPER',
          'MOUNTIE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL GYM'
        },
        'characters': [
          'CHEERING GIRL',
          'NADINE',
          'GREEGE'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'SHELLY'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'NORMA',
          'VIVIAN'
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': "ONE-EYED JACK'S",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': "ONE-EYED JACK'S - BLACKIE'S OFFICE"
        },
        'characters': [
          'HANK',
          'ERNIE',
          'JEAN',
          'MOUNTIE'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'TRUMAN HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 28,
          'location': "HARRY TRUMAN'S LOG CABIN HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'TRUMAN HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 28,
          'location': "HARRY TRUMAN'S"
        },
        'characters': [
          'TRUMAN',
          'JOSIE'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 44,
          'location': 'CAMPSITE'
        },
        'characters': [
          'COOPER',
          'MAJOR BRIGGS'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': []
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          'MAJOR BRIGGS',
          'COOPER'
        ]
      }
    ],
    'episode_description': 'Friends gather around Sarah, as Leland is laid to rest. Cooper says his goodbyes, but an unexpected turn of events keeps him in Twin Peaks. The publisher of the Twin Peaks Gazette argues with his brother, the Mayor; Renault recruits Hank and Ernie to frame Cooper; Nadine enrolls in high school; and Major Briggs, fishing with Cooper, has a strange encounter in the woods.'
  },
  {
    'episode_title': 'Episode 18',
    'episode_subtitle': 'Masked Ball',
    'episode_number': 18,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'ANDY',
          'HAWK',
          'COLE',
          'HAVE MY FULL SUPPORT IN THIS',
          'TOP DOG TO INVESTIGATE THE DRUG',
          'GUYS MAKE A LIVING LOOKING THROUGH'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'HARDY'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL'
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {},
        'characters': [
          'NADINE',
          'MIKE',
          'COACH'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'ROADSIDE BAR'
        },
        'characters': []
      },
      {
        'scene_number': 8,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'WOMAN',
          'JAMES',
          'EVELYN'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION RECEPTION"
        },
        'characters': [
          'ANDY',
          'TREMAYNE',
          'NICKY',
          'TREYMAYNE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "INT. TRUMAN'S OFFICE"
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'HAWK',
          'MAN IN DRESS',
          'DENISE'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL CORRIDOR'
        },
        'characters': [
          'NADINE',
          'DONNA'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'TRUMAN HOUSE',
          'time': 'AFTERNOON',
          'int_ext': 'INT',
          'standard_location_id': 28,
          'location': "TRUMAN'S CABIN"
        },
        'characters': [
          'TRUMAN',
          'JOSIE'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'NORMA',
          'HARDY',
          'HANK',
          'ERNIE',
          'NICKY',
          'TREMAYNE',
          'ANDY'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'OPEN GARAGE'
        },
        'characters': [
          'EVELYN',
          'JAMES'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'HANK'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': []
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "INT. COOPER'S HOTEL ROOM"
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'int_ext': 'INT',
          'location': 'GREAT NORTHERN DINING ROOM',
          'standard_location_id': 5
        },
        'characters': [
          'REVEREND',
          'DOUGIE',
          'LANA',
          'DWAYNE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'int_ext': 'INT',
          'location': "COOPER'S ROOM",
          'standard_location_id': 5
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN BAR WEDDING RECEPTION'
        },
        'characters': [
          'DENISE',
          'COOPER'
        ]
      },
      {
        'scene_number': 22,
        'heading': {},
        'characters': [
          'DWAYNE',
          'PETE',
          'DENISE',
          'TRUMAN',
          'DOUGIE',
          'LANA',
          'COOPER',
          'AUDREY',
          'ANDY'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'JOSIE',
          'CATHERINE',
          'ANDREW'
        ]
      }
    ],
    'episode_description': "Cooper is investigated by the FBI and the DEA for his role in the raid on One Eyed Jacks; Nadine falls for teen Mike Nelson; James gets room and board for helping a beautiful blond; Hank confronts Ben; Tremayne becomes Big Brother to a terror; Catherine forces Josie to become her maid; Cooper's old friend Dennis Bryson arrives in town with a change of appearance; and Andrew Packard turns up alive."
  },
  {
    'episode_title': 'Episode 19',
    'episode_subtitle': 'The Black Widow',
    'episode_number': 19,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE, GREAT NORTHERN"
        },
        'characters': [
          'BOBBY',
          'BEN'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "CORRIDOR OUTSIDE BEN'S OFFICE"
        },
        'characters': []
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S OFFICE, CONFERENCE ROOM"
        },
        'characters': [
          'LITTLEHORSE',
          'COOPER'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'REILLY',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'RECEPTION AREA'
        },
        'characters': [
          'TREMAYNE',
          'ANDY',
          'SWAIN',
          'TREYMAYNE',
          'LUCY',
          'TREMYANE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': "MARSH HOUSE, JAMES' ROOM"
        },
        'characters': [
          'JAMES',
          'MALCOLM'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HOTEL ROOM, GREAT NORTHERN'
        },
        'characters': [
          'DOC',
          'ANDY',
          'TRUMAN',
          'DWAYNE'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HALLWAY OUTSIDE THE ROOM'
        },
        'characters': [
          'DWAYNE',
          'HAWK',
          'LANA',
          'BRIDE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL GYM'
        },
        'characters': [
          'WINGATE',
          'NADINE',
          'MIKE'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': [
          'LITTLEHORSE',
          'COOPER'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'DEAD DOG FARM',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 21,
          'location': 'KITCHEN, DEAD DOG FARM HOUSE'
        },
        'characters': [
          'LITTLEHORSE',
          'COOPER'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'ROAD IN THE WOODS'
        },
        'characters': [
          'TREMAYNE',
          'NICKY'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': "EVELYN'S GARAGE"
        },
        'characters': [
          'EVELYN',
          'JAMES'
        ]
      },
      {
        'scene_number': 15,
        'heading': {},
        'characters': [
          'EVELYN',
          'JEFFREY'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'HIGH SCHOOL',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': 'HIGH SCHOOL'
        },
        'characters': [
          'DONNA',
          'MIKE'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': [
          'AUDREY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CRAWLSPACE'
        },
        'characters': []
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BOBBY',
          'BEN'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CRAWLSPACE'
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'int_ext': 'INT',
          'location': 'BLUE PINE LODGE',
          'standard_location_id': 1
        },
        'characters': [
          'PETE',
          'CATHERINE',
          'JOSIE'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'int_ext': 'INT',
          'location': "COOPER'S ROOM",
          'standard_location_id': 5
        },
        'characters': [
          'COOPER',
          'AUDREY',
          'DENISE'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {},
        'characters': [
          'TREMAYNE',
          'ANDY'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S OFFICE"
        },
        'characters': [
          'HAYWARD',
          'DWAYNE',
          'TRUMAN',
          'HAWK',
          'TREMAYNE'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'LUCY'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'LUCY',
          'LANA',
          'TREMAYNE',
          'HAYWARD',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'ED',
          'NORMA'
        ]
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': [
          'ERNIE',
          'DENISE'
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'ERNIE',
          'DENISE',
          'COOPER'
        ]
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'GARAGE APARTMENT'
        },
        'characters': [
          'JAMES',
          'MALCOM'
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'BRIGGS HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 2,
          'location': 'BRIGGS HOUSE'
        },
        'characters': [
          'BOBBY',
          'BETTY',
          'BRIGGS'
        ]
      }
    ],
    'episode_description': 'Cooper finds cocaine at a deserted house that Renault uses; a mentally decaying Ben has Bobby tail Hank; Dougie Milford dies under unusual circumstances; super strong Nadine joins the wrestling team; and, even as Major Briggs returns, the investigation into his disappearance reveals a presence in the woods near Twin Peaks.'
  },
  {
    'episode_title': 'Episode 20',
    'episode_subtitle': 'Checkmate',
    'episode_number': 20,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'EXT. WOODS'
        },
        'characters': [
          'BRIGGS'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S CONFERENCE ROOM"
        },
        'characters': [
          'BRIGGS',
          'HAYWARD',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'time': 'DAY'
        },
        'characters': [
          'DENISE',
          'ERNIE',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'time': 'DAY'
        },
        'characters': [
          'TREMAYNE',
          'ANDY',
          'COOPER',
          'LUCY'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 7,
        'heading': {},
        'characters': [
          'NORMA',
          'ED'
        ]
      },
      {
        'scene_number': 8,
        'heading': {},
        'characters': [
          'NADINE',
          'MIKE'
        ]
      },
      {
        'scene_number': 9,
        'heading': {},
        'characters': [
          'HANK',
          'NORMA'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'SHELLY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'MARSH GARAGE'
        },
        'characters': [
          'JAMES',
          'EVELYN'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'JOSIE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': [
          'BEN',
          'AUDREY'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE'
        },
        'characters': [
          'ED',
          'NORMA'
        ]
      },
      {
        'scene_number': 17,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'HAWK',
          'NILES',
          'COOPER',
          'ERNIE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'ORPHANAGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 18,
          'location': 'ORPHANAGE'
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'ORPHANAGE',
          'int_ext': 'INT',
          'location': 'ORPHANAGE OFFICE',
          'standard_location_id': 18
        },
        'characters': [
          'TREMAYNE',
          'ANDY',
          'HUSBAND'
        ]
      },
      {
        'scene_number': 22,
        'heading': {},
        'characters': [
          'NORMA',
          'ED'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE'
        },
        'characters': [
          'DONNA',
          'ED',
          'NORMA',
          'HANK',
          'NADINE'
        ]
      },
      {
        'scene_number': 24,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'BOBBY'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN CORRIDOR'
        },
        'characters': [
          'BOBBY',
          'AUDREY'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 13,
          'location': 'MARSH GARAGE'
        },
        'characters': [
          'EVELYN',
          'JAMES'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'DEAD DOG FARM',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 21,
          'location': 'DEAD DOG FARM'
        },
        'characters': []
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'DEAD DOG FARM',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 21,
          'location': 'DEAD DOG FARM BLUFF'
        },
        'characters': [
          'COOPER',
          'HAWK',
          'RENAULT'
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'DEAD DOG FARM',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 21,
          'location': 'DEAD DOG FARM'
        },
        'characters': [
          'RENAULT',
          'TRUMAN',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'MARSH GARAGE APARTMENT'
        },
        'characters': [
          'MALCOM',
          'EVELYN'
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'DEAD DOG FARM',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 21,
          'location': 'DEAD DOG FARM'
        },
        'characters': []
      },
      {
        'scene_number': 35,
        'heading': {
          'standard_location_name': 'DEAD DOG FARM',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 21,
          'location': 'DEAD DOG FARM'
        },
        'characters': [
          'KING',
          'RENAULT',
          'COOPER'
        ]
      },
      {
        'scene_number': 36,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 37,
        'heading': {},
        'characters': [
          'RENAULT',
          'DENISE',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'SHELLY'
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'LUCY',
          'TRUMAN',
          'COOPER'
        ]
      }
    ],
    'episode_description': "Cooper is held hostage by Renault; Andy and Tremayne pry into Nicky's past; Ben slips into a fantasy life as a Civil War general; James succumbs to Evelyn, who has a deadly secret; Ed and Norma succumb to their decades-old passion; Hank confronts Big Ed; and Cooper's ex-partner Windom Earle leaves a gruesome scene at the Twin Peaks Sheriff's Station."
  },
  {
    'episode_title': 'Episode 21',
    'episode_subtitle': 'Double Play',
    'episode_number': 21,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'HAYWARD',
          'TRUMAN',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': []
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'AUDREY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO JOHNSON'S HOUSE"
        },
        'characters': [
          'SHELLY',
          'LEO'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO'S BACK DOOR"
        },
        'characters': []
      },
      {
        'scene_number': 8,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 16,
          'location': "LEO'S"
        },
        'characters': [
          'BOBBY'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'JOHNSON HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 16,
          'location': "LEO'S"
        },
        'characters': [
          'LEO',
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION, RECEPTION AREA"
        },
        'characters': [
          'ANDY',
          'LUCY'
        ]
      },
      {
        'scene_number': 13,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 13,
          'location': 'MARSH ESTATE'
        },
        'characters': [
          'JEFFREY',
          'JAMES',
          'EVELYN'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN'S OFFICE GREAT NORTHERN"
        },
        'characters': [
          'JERRY',
          'JACOBY',
          'AUDREY',
          'BEN'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "TRUMAN'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 13,
          'location': 'EXT. MARSH ESTATE'
        },
        'characters': []
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'JAMES ROOM, MARSH ESTATE'
        },
        'characters': [
          'JAMES',
          'EVELYN',
          'EVELVN'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 43,
          'location': 'GARAGE'
        },
        'characters': []
      },
      {
        'scene_number': 20,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': "WALLY'S BAR",
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 42,
          'location': "WALLY'S BAR"
        },
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': "WALLY'S BAR",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 42,
          'location': "WALLY'S"
        },
        'characters': [
          'DONNA',
          'EVELYN'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLER DINER'
        },
        'characters': []
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R'
        },
        'characters': [
          'NORMA',
          'BIG ED',
          'DOC'
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': 'SHERIFF STATION'
        },
        'characters': [
          'LUCY',
          'BRIGGS'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "TRUMAN'S OFFICE"
        },
        'characters': [
          'LUCY',
          'COOPER',
          'TRUMAN',
          'BRIGGS',
          'ANDY'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'JACOBY',
          'TRUMAN',
          'EVERYONE',
          'COOPER',
          'LANA'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DUSK',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'HALLWAY'
        },
        'characters': [
          'DWAYNE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'DWAYNE',
          'TRUMAN',
          'JACOBY',
          'COOPER',
          'EVERYONE',
          'ANDY'
        ]
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'DWAYNE',
          'LANA',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'INT. BLUE PINE KITCHEN'
        },
        'characters': [
          'PETE',
          'CATHERINE',
          'ANDREW'
        ]
      },
      {
        'scene_number': 34,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "INT. SHERIFF STATION, LUCY'S AREA"
        },
        'characters': [
          'HAYWARD',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 35,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "TRUMAN'S OFFICE"
        },
        'characters': [
          'HAYWARD',
          'TREMAYNE',
          'ANDY',
          'LUCY'
        ]
      },
      {
        'scene_number': 36,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': []
      },
      {
        'scene_number': 37,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'CLERK',
          'JONES'
        ]
      },
      {
        'scene_number': 38,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'JAMES ROOM - MARSH ESTATE'
        },
        'characters': [
          'EVELYN',
          'JAMES'
        ]
      },
      {
        'scene_number': 39,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': [
          'DONNA',
          'JAMES'
        ]
      },
      {
        'scene_number': 40,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': []
      },
      {
        'scene_number': 41,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CABIN'
        },
        'characters': [
          'LEO',
          'VOICE',
          'MAN'
        ]
      }
    ],
    'episode_description': "Cooper confides to Truman his past experiences with Windom Earle; Leo awakens from his coma and finds a new cause in life; Audrey strikes a business deal with Bobby, as they attempt to save Ben's sanity; when Evelyn's husband is killed, James realizes he has been set up; Thomas Eckhardt, who is Josie's former lover and the man who attempted to kill Andrew Packard, appears; Windom Earle is revealed."
  },
  {
    'episode_title': 'Episode 22',
    'episode_subtitle': 'Slaves and Masters',
    'episode_number': 22,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 13,
          'location': 'MARSH HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'MARSH HOUSE, VESTIBULE IN FRONT OF THE STAIRS'
        },
        'characters': [
          'COP',
          'MALCOLM',
          'EVELYN'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': "WALLY'S BAR",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 42,
          'location': "WALLY'S BAR"
        },
        'characters': [
          'DONNA',
          'JAMES',
          'DONNA '
        ]
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          'TRUMAN',
          'BOBBY',
          'COOPER',
          'SHELLY',
          'ALBERT'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE'
        },
        'characters': [
          'ED',
          'NORMA',
          'NADINE'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE OFFICE'
        },
        'characters': [
          'TRUMAN',
          'JOSIE',
          'COOPER'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE, KITCHEN AREA'
        },
        'characters': [
          'PETE',
          'COOPER',
          'JOSIE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "GREAT NORTHERN HOTEL, THOMAS ECKHARDT'S ROOM"
        },
        'characters': [
          'ECKHARDT'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'int_ext': 'INT',
          'location': 'BLUE PINE LODGE',
          'standard_location_id': 1
        },
        'characters': [
          'CATHERINE'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'time': 'DAY'
        },
        'characters': [
          'ECKHARDT',
          'JONES'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'BEN',
          'AUDREY',
          'JACOBY',
          'JERRY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': "WALLY'S BAR",
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 42,
          'location': "WALLY'S BAR"
        },
        'characters': [
          'DONNA',
          'EVELYN',
          'MALCOLM'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': 'SHERIFFS STATION'
        },
        'characters': []
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'ALBERT',
          'COOPER'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'THE DOUBLE R DINER'
        },
        'characters': [
          'PETE',
          'COOPER',
          'TRUMAN',
          'HAYWARD'
        ]
      },
      {
        'scene_number': 19,
        'heading': {},
        'characters': [
          'SHELLY',
          'NORMA',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'THE BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'THE BLUE PINE LODGE'
        },
        'characters': [
          'CATHERINE',
          'JOSIE',
          'ECKHARDT'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LIVING ROOM'
        },
        'characters': [
          'ECKHARDT',
          'CATHERINE',
          'JOSIE'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 13,
          'location': 'MARSH HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'MARSH HOUSE'
        },
        'characters': [
          'JAMES',
          'EVELYN',
          'MALCOLM'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'EARLE',
          'LEO'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'AUDREY',
          'BEN',
          'JERRY',
          'JACOBY',
          'BOBBY'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 13,
          'location': 'MARSH HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'MARSH ESTATE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 13,
          'location': 'MARSH HOUSE'
        },
        'characters': [
          'MALCOM',
          'EVELYN',
          'DONNA',
          'JAMES'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN ROOM'
        },
        'characters': []
      }
    ],
    'episode_description': "Cooper finds some evidence about who shot him, and gets help from Pete, the town's resident chess master in matching wits with Windom Earle in the deadly chess game; Donna makes a desperate plea to save James, who is suspected in the Marsh murder; Shelly returns to work; Nadine breaks up with Ed in favor of Mike; and Catherine uses Josie to lure Eckhardt."
  },
  {
    'episode_title': 'Episode 23',
    'episode_subtitle': 'The Condemned Woman',
    'episode_number': 23,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'PETE',
          'CATHERINE',
          'ANDREW'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S TRUMAN'S OFFICE"
        },
        'characters': [
          'HANK',
          'TRUMAN',
          'HAWK'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'MORNING',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'ALBERT',
          'COOPER'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': [
          'AUDREY',
          'EMILE',
          'WHEELER'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE'
        },
        'characters': [
          'ED',
          'NADINE'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'COOPER',
          'JOSIE'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'JOSIE',
          'COOPER',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': [
          'ECKHARDT',
          'JONES'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BOBBY',
          'BEN',
          'WHEELER',
          'AUDREY',
          'JERRY'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'NORMA',
          'SHELLY',
          'ED'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'HANK',
          'NORMA'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'PETE'
        ]
      },
      {
        'scene_number': 16,
        'heading': {},
        'characters': [
          'PETE',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "INT. SHERIFF'S STATION HALLWAY"
        },
        'characters': [
          'ALBERT',
          'COOPER'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'int_ext': 'INT',
          'location': 'BLUE PINE LODGE',
          'standard_location_id': 1
        },
        'characters': [
          'JOSIE',
          'ANDREW'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'MISC OUTSIDE',
          'int_ext': 'EXT',
          'location': 'MOUNTAIN',
          'standard_location_id': 44
        },
        'characters': [
          'JAMES',
          'DONNA'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'PETE',
          'TRUMAN',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN ELEVATOR'
        },
        'characters': [
          'ANDREW',
          'ECKHARDT'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': [
          'BEN',
          'WHEELER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'DONNA',
          'SHELLY',
          'AUDREY'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'JOSIE',
          'COOPER',
          'JOISE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {},
        'characters': []
      }
    ],
    'episode_description': "Ed proposes marriage to Norma; James and Donna break up; Audrey is reunited with a handsome, wealthy admirer from her past; Earle mails a poem to Audrey, Shelly and Donna; Hank is arrested for Leo's murder, but points a finger at someone else; and Josie is forced to meet with Eckhardt - an encounter that ends in tragedy."
  },
  {
    'episode_title': 'Episode 24',
    'episode_subtitle': 'Wounds and Scars',
    'episode_number': 24,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 20,
          'location': 'BOOKHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'HAWK',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 4,
        'heading': {},
        'characters': [
          'YOUNG WOMAN',
          'NORMA',
          'SHELLY',
          'ANNIE',
          'BRIGGS'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'time': 'BRIGGS'
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION - TRUMAN'S OFFICE"
        },
        'characters': [
          'HAWK',
          'COOPER'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN DINING ROOM'
        },
        'characters': [
          'TREMAYNE',
          'MODEL',
          'AUDREY',
          'WHEELER',
          'PINKLE',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'LEO',
          'WINDOM',
          'EARLE'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 20,
          'location': 'BOOKHOUSE'
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'JONES',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'MAN',
          'DONNA',
          'CRAIG'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'COOPER',
          'PETE',
          'LUCY',
          'ANDY'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'BRIGGS',
          'COOPER',
          'LOG LADY'
        ]
      },
      {
        'scene_number': 14,
        'heading': {},
        'characters': [
          'LOG LADY',
          'COOPER',
          'BRIGGS'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'AUDREY',
          'WHEELER'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': "HAYWARD'S LIVING ROOM."
        },
        'characters': [
          'DONNA',
          'HAYWARD',
          'DOC HAYWARD',
          'EILEEN'
        ]
      },
      {
        'scene_number': 17,
        'heading': {},
        'characters': [
          'DONNA',
          'HAYWARD',
          'EILEEN'
        ]
      },
      {
        'scene_number': 18,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'ED',
          'NADINE',
          'JACOBY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'NORMA',
          'SHELLY',
          'MAN',
          'COOPER',
          'ANNIE'
        ]
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': [
          'ANNIE',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 20,
          'location': 'BOOKHOUSE ENTRANCE'
        },
        'characters': [
          'ANDY',
          'HAWK',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'int_ext': 'INT',
          'location': 'BOOKHOUSE',
          'standard_location_id': 20
        },
        'characters': [
          'COOPER',
          'HAWK',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'LOBBY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': [
          'LAZARE',
          'MIKE',
          'NADINE',
          'MODEL'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'BEN',
          'TREMAYNE'
        ]
      },
      {
        'scene_number': 26,
        'heading': {},
        'characters': [
          'AUDREY',
          'ANDY',
          'LUCY'
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': [
          'CATHERINE',
          'BEN'
        ]
      },
      {
        'scene_number': 28,
        'heading': {},
        'characters': [
          'TREMAYNE',
          'PINKLE',
          'ANDY',
          'AUDREY',
          'WHEELER'
        ]
      },
      {
        'scene_number': 29,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 30,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': []
      }
    ],
    'episode_description': "Norma's sister Annie leaves the convent and comes to Twin Peaks, where Cooper becomes enamored of her; Truman sinks into depression; Catherine is left a mysterious puzzle box by Eckhardt; plans get underway for the Miss Twin Peaks pageant; and Ben finds an ingenious way to stop Catherine's development - saving an endangered pine weasel."
  },
  {
    'episode_title': 'Episode 25',
    'episode_subtitle': 'On the Wings of Love',
    'episode_number': 25,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'BOOKHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 20,
          'location': 'BOOKHOUSE'
        },
        'characters': [
          'TRUMAN',
          'JONES'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'FROM BEHIND THE DOOR',
          'WHEELER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "TRUMAN'S OFFICE"
        },
        'characters': [
          'DOC',
          'COOPER',
          'TRUMAN',
          'COLE'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': [
          'EARLE',
          'COOPER',
          'COLE',
          'DOCTORS DISCOVERED HE WAS ON',
          'DOC'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': []
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY/CORRIDOR'
        },
        'characters': []
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'DESK CLERK',
          'MIKE',
          'DONNA',
          'NADINE',
          'AUDREY'
        ]
      },
      {
        'scene_number': 11,
        'heading': {},
        'characters': [
          'BEN',
          'EILEEN'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'AUDREY',
          'DONNA'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLER DINER'
        },
        'characters': [
          'COLE',
          'HANGOVER WAS RAW MEAT AND PLENTY',
          'TRUMAN',
          'STEAK SO RARE YOU COULD SELL IT AT',
          'COOPER',
          'THAT MAKES YOU WISH YOU',
          'TROUBLE YOU FOR A CUP OF STRONG',
          'ENGAGE YOU WITH AN ANECDOTE OF NO',
          'SHELLY',
          'LOG LADY'
        ]
      },
      {
        'scene_number': 15,
        'heading': {},
        'characters': [
          'COOPER',
          'TRUMAN',
          'ANNIE'
        ]
      },
      {
        'scene_number': 16,
        'heading': {},
        'characters': [
          'ANNIE',
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'HAYWARD',
          'DONNA'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'LIBRARY',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 26,
          'location': 'TWIN PEAKS CITY LIBRARY'
        },
        'characters': [
          'STRANGER',
          'AUDREY',
          'EARLE'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'LUCY',
          'ANDY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF TRUMAN'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLER DINER'
        },
        'characters': [
          'SHELLY',
          'ANNIE',
          'NORMA'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'AUDREY',
          'WHEELER'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'OWL CAVE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 33,
          'location': 'OWL CAVE'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'OWL CAVE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 33,
          'location': 'OWL CAVE'
        },
        'characters': [
          'COOPER',
          'ANDY',
          'HAWK',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN BAR'
        },
        'characters': [
          'ANNIE',
          'BARTENDER',
          'COOPER'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'OWL CAVE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 33,
          'location': 'OWL CAVE'
        },
        'characters': [
          'EARLE'
        ]
      }
    ],
    'episode_description': "Cooper and the Sheriff's Department go spelunking in Owl Cave; Truman awakens in the murderous embrace of a naked woman; Audrey and John Justice Wheeler start a relationship; Windom Earle insinuates himself into the lives of potential victims; Audrey and Donna see Mrs. Hayward meet with Ben."
  },
  {
    'episode_title': 'Episode 26',
    'episode_subtitle': 'Variations on Relations',
    'episode_number': 26,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'OWL CAVE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 33,
          'location': 'OWL CAVE'
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'HAWK'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'EARLE',
          'YOUTH'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          '4, INT. BLUE PINE LODGE - DAY',
          'PETE',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLE R DINER'
        },
        'characters': [
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 7,
        'heading': {},
        'characters': [
          'LANA',
          'MILFORD'
        ]
      },
      {
        'scene_number': 8,
        'heading': {},
        'characters': [
          'ANNIE',
          'COOPER',
          'BOBBY',
          'SHELLY'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': []
      },
      {
        'scene_number': 10,
        'heading': {},
        'characters': [
          'TRUMAN',
          'COOPER',
          'HAWK'
        ]
      },
      {
        'scene_number': 11,
        'heading': {},
        'characters': [
          'BRIGGS',
          'ANDY',
          'COOPER',
          'BRIGGS ',
          'HAWK',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'THE GREAT NORTHERN HOTEL'
        },
        'characters': [
          'TREMAYNE',
          'BEN'
        ]
      },
      {
        'scene_number': 13,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'EARLE',
          'YOUTH',
          'LEO'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'DOC',
          'MILFORD',
          'PETE',
          'BEN'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'BOBBY',
          'BEN',
          'PETE',
          'MILFORD',
          'SHELLY',
          'DONNA',
          'NADINE',
          'MIKE'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE STUDY'
        },
        'characters': [
          'TRUMAN',
          'CATHERINE',
          'PETE',
          'CATHERINE '
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 38,
          'location': 'LAKE'
        },
        'characters': []
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 38,
          'location': 'LAKE'
        },
        'characters': [
          'ANNIE',
          'COOPER'
        ]
      },
      {
        'scene_number': 21,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 22,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 3,
          'location': 'EXT. DOUBLE R DINER'
        },
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'INT. DOUBLE R DINER'
        },
        'characters': [
          'COLE',
          'SHELLY',
          'COOPER',
          'MAKES PEOPLE WHO NEED PEOPLE THE ',
          'ONE EVER MENTIONED A THING ABOUT A',
          'BOBBY'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'EILEEN',
          'DONNA',
          'HAYWARD'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN BAR AREA'
        },
        'characters': [
          'TREMAYNE',
          'ANDY',
          'LUCY',
          'LANA'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': "WALLY'S BAR",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 42,
          'location': 'BAR AREA'
        },
        'characters': [
          'WHEELER',
          'COOPER',
          'VOICE'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': "WALLY'S BAR",
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 42,
          'location': 'BAR'
        },
        'characters': [
          'TREMAYNE',
          'LUCY',
          'LANA',
          'ANDY'
        ]
      },
      {
        'scene_number': 30,
        'heading': {},
        'characters': [
          'TRUMAN',
          'COOPER'
        ]
      }
    ],
    'episode_description': 'Cooper and Truman try to decipher the hieroglyph from Owl Cave; Pete and Catherine obsess over the puzzle box; Annie and Cooper bond; Gordon Cole falls for Shelly; Tremayne holds a wine tasting at the Great Northern Hotel; and Windom Earle makes his next move.'
  },
  {
    'episode_title': 'Episode 27',
    'episode_subtitle': 'The Path to the Black Lodge',
    'episode_number': 27,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'SHELLY',
          'BOBBY',
          'VOICE',
          'LUCY',
          'ANDY'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'BRIGGS',
          'CAPPY',
          'COOPER',
          'EARLE ON SCREEN',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE, ATTIC'
        },
        'characters': [
          'DONNA'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'INT. GREAT NORTHERN HOTEL LOBBY'
        },
        'characters': [
          'WHEELER',
          'CLERK'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': [
          'EARLE',
          'LEO'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DOUBLER DINER'
        },
        'characters': [
          'COOPER',
          'ANNIE'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'BOBBY',
          'SHELLY',
          'MILFORD',
          'LANA'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': [
          'BEN',
          'DOC',
          'WHEELER'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'CLERK',
          'HAWK',
          'AUDREY'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'WHEELER',
          'BEN'
        ]
      },
      {
        'scene_number': 13,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'HORSE',
          'BRIGGS',
          'EARLE'
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION, INTERROGATION ROOM"
        },
        'characters': [
          'COOPER',
          'AUDREY',
          'DONNA',
          'SHELLY'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'ANDREW',
          'CATHERINE'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': [
          'BRIGGS',
          'EARLE'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE'
        },
        'characters': [
          'NADINE',
          'NORMA',
          'MIKE',
          'JACOBY',
          'ED'
        ]
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN HOTEL'
        },
        'characters': []
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': []
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "BEN HORNE'S OFFICE"
        },
        'characters': [
          'BEN',
          'AUDREY'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN LOBBY'
        },
        'characters': [
          'AUDREY',
          'PETE'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE AIRPORT'
        },
        'characters': [
          'VOICE',
          'TIM',
          'WHEELER',
          'TOM'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION CONFERENCE ROOM"
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE AIRPORT'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'CAR IN TRANSIT',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 27,
          'location': 'TRUCK IN MOTION'
        },
        'characters': [
          'AUDREY'
        ]
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE AIRPORT'
        },
        'characters': [
          'AUDREY',
          'WHEELER'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 19,
          'location': 'THE ROADHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'THE ROADHOUSE'
        },
        'characters': [
          'ANNIE',
          'COOPER',
          'MILFORD'
        ]
      },
      {
        'scene_number': 30,
        'heading': {
          'standard_location_name': 'BLACK LAKE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 29,
          'location': 'BLACK LAKE AIRPORT'
        },
        'characters': [
          'AUDREY',
          'PETE'
        ]
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': []
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'MONTAGE/ WOODS'
        },
        'characters': []
      }
    ],
    'episode_description': 'Windom Earle captures Major Briggs to interrogate him to how much he knows about the Owl Cave paintings; Cooper receives a message from the other side; Donna makes a discovery on her birth certificate; and Wheeler leaves town suddenly as Audrey looks for him to say goodbye.'
  },
  {
    'episode_title': 'Episode 28',
    'episode_subtitle': 'Miss Twin Peaks',
    'episode_number': 28,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "WINDOM EARLE'S CABIN"
        },
        'characters': [
          'LEO'
        ]
      },
      {
        'scene_number': 3,
        'heading': {
          'time': 'LATER'
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'DOUBLE R',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 3,
          'location': 'DINER'
        },
        'characters': [
          'NORMA',
          'ANNIE',
          'SHELLY',
          'COOPER'
        ]
      },
      {
        'scene_number': 5,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREAT NORTHERN'
        },
        'characters': [
          'AUDREY',
          'BEN'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'int_ext': 'INT',
          'location': "SHERIFF'S STATION",
          'standard_location_id': 9
        },
        'characters': [
          'COOPER',
          'TRUMAN',
          'ANDY'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'EARLE'
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': [
          'PINKLE',
          'AUDREY',
          'DONNA',
          'LUCY',
          'SHELLY',
          'NADINE',
          'ANNIE',
          'LANA',
          'TREMAYNE',
          'MILFORD',
          'NORMA'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'TREMAYNE',
          'LANA'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "GREAT NORTHERN/COOPER'S ROOM"
        },
        'characters': [
          'COOPER',
          'ANNIE'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE - LIVING ROOM'
        },
        'characters': [
          'NADINE',
          'NORMA',
          'MIKE',
          'JACOBY',
          'ED'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'int_ext': 'EXT'
        },
        'characters': []
      },
      {
        'scene_number': 13,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S OFFICE"
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'BRIGGS',
          'ANDY'
        ]
      },
      {
        'scene_number': 15,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'COOPER',
          'ANNIE'
        ]
      },
      {
        'scene_number': 16,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'ANDREW',
          'CATHERINE',
          'PETE'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'DOC',
          'EILEEN',
          'DONNA'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'int_ext': 'INT',
          'location': 'CONFERENCE ROOM',
          'standard_location_id': 43
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 19,
        'heading': {},
        'characters': [
          'COOPER',
          'TRUMAN',
          'BRIGGS',
          'ANDY'
        ]
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE/STAGE'
        },
        'characters': [
          'DOC',
          'BOBBY'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'time': 'LATER'
        },
        'characters': [
          'DOC'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'ANDY'
        ]
      },
      {
        'scene_number': 23,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 24,
        'heading': {},
        'characters': [
          'MILFORD'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'time': 'LATER'
        },
        'characters': []
      },
      {
        'scene_number': 26,
        'heading': {
          'time': 'LATER'
        },
        'characters': [
          'AUDREY'
        ]
      },
      {
        'scene_number': 27,
        'heading': {},
        'characters': [
          'ANDY'
        ]
      },
      {
        'scene_number': 28,
        'heading': {
          'time': 'LATER'
        },
        'characters': [
          'ANNIE'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'time': 'CATWALK'
        },
        'characters': []
      },
      {
        'scene_number': 30,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 31,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 32,
        'heading': {},
        'characters': [
          'DOC'
        ]
      },
      {
        'scene_number': 33,
        'heading': {},
        'characters': [
          'LUCY',
          'ANDY',
          'TREMAYNE'
        ]
      },
      {
        'scene_number': 34,
        'heading': {},
        'characters': [
          'DONNA',
          'BEN'
        ]
      },
      {
        'scene_number': 35,
        'heading': {},
        'characters': [
          'DOC',
          'MILFORD',
          'TREMAYNE',
          'NORMA'
        ]
      },
      {
        'scene_number': 36,
        'heading': {},
        'characters': [
          'COOPER',
          'EARLE',
          'VOICE',
          'TRUMAN',
          'ANDY'
        ]
      }
    ],
    'episode_description': "Thanks to Andy, Cooper and Truman decipher part of the secret of the Black Lodge. Cooper helps Annie prepare for the Miss Twin Peaks beauty contest. Major Briggs escapes from Earle with a little of Leo's help. Catherine continues her battle to open the black box. Ed breaks up with Nadine, as he and Norma decide to move ahead with their plans. Lucy chooses Andy to be the father of her baby. The Miss Twin Peaks contest goes from frivolity to terror when Windom Earle crashes the event disguised as the Log Lady."
  },
  {
    'episode_title': 'Episode 29',
    'episode_subtitle': 'Beyond Life and Death',
    'episode_number': 29,
    'scenes': [
      {
        'scene_number': 1,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'ROADHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 19,
          'location': 'ROADHOUSE'
        },
        'characters': []
      },
      {
        'scene_number': 3,
        'heading': {
          'standard_location_name': 'SHERIFF STATION',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 9,
          'location': "SHERIFF'S STATION"
        },
        'characters': [
          'LUCY',
          'ANDY'
        ]
      },
      {
        'scene_number': 4,
        'heading': {
          'standard_location_name': 'MISC INSIDE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 43,
          'location': 'CONFERENCE ROOM'
        },
        'characters': [
          'TRUMAN',
          'COOPER',
          'PETE'
        ]
      },
      {
        'scene_number': 5,
        'heading': {},
        'characters': [
          'COOPER',
          'TRUMAN',
          'PETE'
        ]
      },
      {
        'scene_number': 6,
        'heading': {
          'standard_location_name': 'HURLEY HOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 10,
          'location': 'HURLEY HOUSE'
        },
        'characters': [
          'HAYWARD',
          'MIKE',
          'NADINE',
          'ED'
        ]
      },
      {
        'scene_number': 7,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': []
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'CAR IN TRANSIT',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 27,
          'location': "MARTELL'S PICKUP"
        },
        'characters': [
          'EARLE',
          'ANNIE'
        ]
      },
      {
        'scene_number': 9,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'ROAD IN THE WOODS'
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 10,
        'heading': {
          'standard_location_name': 'GLASTONBURY GROVE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 30,
          'location': 'THE WOODS, GLASTONBURY GROVE'
        },
        'characters': [
          'ANNIE',
          'EARLE'
        ]
      },
      {
        'scene_number': 11,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'COOPER',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 12,
        'heading': {
          'standard_location_name': 'GLASTONBURY GROVE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 30,
          'location': 'GLASTONBURY GROVE'
        },
        'characters': [
          'EARLE',
          'ANNIE'
        ]
      },
      {
        'scene_number': 13,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 14,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 15,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 16,
        'heading': {},
        'characters': [
          'TRUMAN'
        ]
      },
      {
        'scene_number': 17,
        'heading': {
          'standard_location_name': 'GLASTONBURY GROVE',
          'time': 'NIGHT',
          'int_ext': 'EXT',
          'standard_location_id': 30,
          'location': 'GLASTONBURY GROVE'
        },
        'characters': [
          'ANDY',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 18,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': []
      },
      {
        'scene_number': 19,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': []
      },
      {
        'scene_number': 20,
        'heading': {
          'standard_location_name': 'BLUE PINE LODGE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 1,
          'location': 'BLUE PINE LODGE'
        },
        'characters': [
          'ANDREW',
          'PETE'
        ]
      },
      {
        'scene_number': 21,
        'heading': {
          'standard_location_name': 'HAYWARD HOUSE',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 11,
          'location': 'HAYWARD HOUSE'
        },
        'characters': [
          'EILEEN',
          'DONNA',
          'BEN',
          'HAYWARD'
        ]
      },
      {
        'scene_number': 22,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 23,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'CLERK',
          'COOPER',
          'COOPER AS BOY',
          'OLD MAN'
        ]
      },
      {
        'scene_number': 24,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'BRIGGS',
          'HAWKS',
          'HAWK'
        ]
      },
      {
        'scene_number': 25,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': [
          'LEO'
        ]
      },
      {
        'scene_number': 26,
        'heading': {
          'standard_location_name': 'EARLE CABIN',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 35,
          'location': "EARLE'S CABIN"
        },
        'characters': []
      },
      {
        'scene_number': 27,
        'heading': {
          'standard_location_name': 'BANK',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 24,
          'location': 'TWIN PEAKS SAVINGS AND LOAN'
        },
        'characters': []
      },
      {
        'scene_number': 28,
        'heading': {
          'standard_location_name': 'BANK',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 24,
          'location': 'TWIN PEAKS SAVINGS AND LOAN'
        },
        'characters': [
          'MIBBLER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 29,
        'heading': {
          'standard_location_name': 'BANK',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 24,
          'location': 'TWIN PEAKS SAVINGS AND LOAN'
        },
        'characters': [
          'ANDREW',
          'MIBBLER',
          'ANDREW PETE',
          'AUDREY'
        ]
      },
      {
        'scene_number': 30,
        'heading': {},
        'characters': [
          'PETE',
          'ANDREW'
        ]
      },
      {
        'scene_number': 31,
        'heading': {
          'standard_location_name': 'BANK',
          'time': 'DAY',
          'int_ext': 'INT',
          'standard_location_id': 24,
          'location': 'TWIN PEAKS SAVINGS AND LOAN'
        },
        'characters': [
          'CATHERINE',
          'MIBBLER',
          'AUDREY'
        ]
      },
      {
        'scene_number': 32,
        'heading': {
          'standard_location_name': 'BANK',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 24,
          'location': 'TWIN PEAKS SAVINGS AND LOAN'
        },
        'characters': []
      },
      {
        'scene_number': 33,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'ANDY',
          'TRUMAN'
        ]
      },
      {
        'scene_number': 34,
        'heading': {},
        'characters': [
          'TRUMAN'
        ]
      },
      {
        'scene_number': 35,
        'heading': {},
        'characters': [
          'COOPER',
          'CUT TO BLACK'
        ]
      },
      {
        'scene_number': 36,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'EARLE',
          'SHREDDING YOUR INTERNAL ORGANS OUT OF'
        ]
      },
      {
        'scene_number': 37,
        'heading': {
          'int_ext': 'INT'
        },
        'characters': [
          'COOPER',
          'ANNIE'
        ]
      },
      {
        'scene_number': 38,
        'heading': {},
        'characters': []
      },
      {
        'scene_number': 39,
        'heading': {},
        'characters': [
          'COOPER'
        ]
      },
      {
        'scene_number': 40,
        'heading': {},
        'characters': [
          'EARLE',
          'COOPER'
        ]
      },
      {
        'scene_number': 41,
        'heading': {},
        'characters': [
          'EARLE',
          'COOPER'
        ]
      },
      {
        'scene_number': 42,
        'heading': {},
        'characters': [
          'EARLE',
          'COOPER'
        ]
      },
      {
        'scene_number': 43,
        'heading': {
          'standard_location_name': 'WOODS',
          'time': 'DAY',
          'int_ext': 'EXT',
          'standard_location_id': 22,
          'location': 'WOODS'
        },
        'characters': [
          'TRUMAN'
        ]
      },
      {
        'scene_number': 44,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "GREAT NORTHERN COOPER'S ROOM"
        },
        'characters': [
          'DOC',
          'TRUMAN',
          'COOPER'
        ]
      },
      {
        'scene_number': 45,
        'heading': {
          'standard_location_name': 'GREAT NORTHERN',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': "COOPER'S BATHROOM"
        },
        'characters': []
      }
    ],
    'episode_description': 'Cooper must overcome his deepest fears as he tracks down Windom Earle, who has kidnapped Annie, and has taken her into the sinister realm of the Black Lodge. Meanwhile, Nadine awakens after being hit on the head during the "Miss Twin Peaks" pageant, and is devastated after seeing Big Ed with Norma. Dr. Hayward engages in a tussle with Ben Horne, knocking him into the fireplace mantle as revenge for interfering with his family\'s affairs. The next day, as Truman and Andy wait for Cooper to return from the Black Lodge, Audrey stages an act of civil disobedience at the Twin Peaks Savings & Loan. Andrew and Pete obtain the safety deposit box key and try to unlock Thomas Eckhardt\'s final box in the bank. The box contains a bomb left behind by Eckhart which explodes when opened... apparently killing Andrew, Pete, and Audrey. Major Briggs receives a message from Windom Earle, who conveys it through Sarah Palmer. Cooper embarks on a strange and fateful journey into the Black Lodge, which results in his ultimate downfall. Cooper bargains with Earle for Annie\'s life. BOB kills Earle and takes his soul. Cooper meets his own evil shadow self and his shadow self emerges from the Lodge with the soul of the doppelg\u00e4nger inhabited by BOB.'
  }
]

var LOCATIONS = [
  {
    'standard_location_name': 'GREAT NORTHERN',
    'standard_location_id': 5
  },
  {
    'standard_location_name': 'PALMER HOUSE',
    'standard_location_id': 8
  },
  {
    'standard_location_name': "ONE-EYED JACK'S",
    'standard_location_id': 7
  },
  {
    'standard_location_name': 'JOHNSON HOUSE',
    'standard_location_id': 16
  },
  {
    'standard_location_name': 'GLASTONBURY GROVE',
    'standard_location_id': 30
  },
  {
    'standard_location_name': 'MISC OUTSIDE',
    'standard_location_id': 44
  },
  {
    'standard_location_name': 'SHERIFF STATION',
    'standard_location_id': 9
  },
  {
    'standard_location_name': 'WOODS',
    'standard_location_id': 22
  },
  {
    'standard_location_name': 'ROADHOUSE',
    'standard_location_id': 19
  },
  {
    'standard_location_name': 'MARSH ESTATE',
    'standard_location_id': 13
  },
  {
    'standard_location_name': 'STREET',
    'standard_location_id': 41
  },
  {
    'standard_location_name': 'BRIGGS HOUSE',
    'standard_location_id': 2
  },
  {
    'standard_location_name': 'DOUBLE R',
    'standard_location_id': 3
  },
  {
    'standard_location_name': 'DEAD DOG FARM',
    'standard_location_id': 21
  },
  {
    'standard_location_name': 'BANK',
    'standard_location_id': 24
  },
  {
    'standard_location_name': 'HOSPITAL',
    'standard_location_id': 15
  },
  {
    'standard_location_name': 'HURLEY HOUSE',
    'standard_location_id': 10
  },
  {
    'standard_location_name': 'HAROLD SMITH HOUSE',
    'standard_location_id': 6
  },
  {
    'standard_location_name': 'JACQUES RENAULT APT',
    'standard_location_id': 37
  },
  {
    'standard_location_name': 'HAYWARD HOUSE',
    'standard_location_id': 11
  },
  {
    'standard_location_name': 'MISC INSIDE',
    'standard_location_id': 43
  },
  {
    'standard_location_name': "WALLY'S BAR",
    'standard_location_id': 42
  },
  {
    'standard_location_name': 'MOTEL',
    'standard_location_id': 17
  },
  {
    'standard_location_name': 'HIGH SCHOOL',
    'standard_location_id': 12
  },
  {
    'standard_location_name': 'LAKE',
    'standard_location_id': 38
  },
  {
    'standard_location_name': 'BLACK LAKE',
    'standard_location_id': 29
  },
  {
    'standard_location_name': 'MILL',
    'standard_location_id': 34
  },
  {
    'standard_location_name': 'BLUE PINE LODGE',
    'standard_location_id': 1
  },
  {
    'standard_location_name': 'OWL CAVE',
    'standard_location_id': 33
  },
  {
    'standard_location_name': 'DR JACOBY',
    'standard_location_id': 39
  },
  {
    'standard_location_name': 'CAR IN TRANSIT',
    'standard_location_id': 27
  },
  {
    'standard_location_name': 'BOOKHOUSE',
    'standard_location_id': 20
  },
  {
    'standard_location_name': 'JAMES HURLEY HOUSE',
    'standard_location_id': 36
  },
  {
    'standard_location_name': 'HARDWARE STORE',
    'standard_location_id': 31
  },
  {
    'standard_location_name': 'TRUMAN HOUSE',
    'standard_location_id': 28
  },
  {
    'standard_location_name': 'CEMETERY',
    'standard_location_id': 46
  },
  {
    'standard_location_name': 'LOG LADY CABIN',
    'standard_location_id': 47
  },
  {
    'standard_location_name': 'PRISON',
    'standard_location_id': 45
  },
  {
    'standard_location_name': 'LUCY APARTMENT',
    'standard_location_id': 33
  },
  {
    'standard_location_name': 'EARLE CABIN',
    'standard_location_id': 35
  },
  {
    'standard_location_name': 'MORGUE',
    'standard_location_id': 25
  },
  {
    'standard_location_name': "HORNE'S DEPARTMENT STORE",
    'standard_location_id': 32
  },
  {
    'standard_location_name': 'INVITATION TO LOVE',
    'standard_location_id': 40
  },
  {
    'standard_location_name': 'LIBRARY',
    'standard_location_id': 26
  },
  {
    'standard_location_name': 'ORPHANAGE',
    'standard_location_id': 18
  },
  {
    'standard_location_name': 'TREMOND HOUSE',
    'standard_location_id': 23
  },
  {
    'standard_location_name': 'BLACK LODGE',
    'standard_location_id': 14
  }
]

ReactDOM.render(
  <App episodes={EPISODES} locations={LOCATIONS} />,
  document.getElementById('app')
)
