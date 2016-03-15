var App = React.createClass({
  getInitialState: function () {
    return { selectedEpisode: 0 }
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
      <h1>Twin Peaks Episode Review</h1>
      <p>
        Select an episode
        <br />
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
    return (
    <button className='episodeSelector' onClick={this.handleChange}>
      {this.props.episodeNumSelect}
    </button>

    )
  }
})

var Episode = React.createClass({
  getInitialState: function () {
    return { selectedScene: 0, selectedLocation: 5,
      selectedCharacters: [
        {
          'standard_character_id': '90',
          'standard_character_name': 'MODEL',
          'character_group': '7',
          'raw_character_name': 'MODEL'
        },
        {
          'standard_character_id': '88',
          'standard_character_name': 'MIKE',
          'character_group': '2',
          'raw_character_name': 'MIKE'
        },
        {
          'standard_character_id': '74',
          'standard_character_name': 'LAZARE',
          'character_group': '7',
          'raw_character_name': 'LAZARE'
        }
    ] }
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
                      <h2>Episode number {this.props.episodeNum}</h2>
                      <p>
                        Select a scene
                        <br />
                        {sceneNums}
                      </p>
                      <div className='map'>
                        {mapLocations}
                      </div>
                      {sceneNodes}
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
    return (

    <button className='sceneSelector' onClick={this.handleChange}>
      {this.props.sceneNumSelect}
    </button>

    )
  }
})

var Location = React.createClass({
  render: function () {
    return (
    <p>
      {this.props.locationName}
    </p>
    )
  }
})

var Character = React.createClass({
  render: function () {
    return (
    <li className='characters'>
      <img className='pic' src={this.props.pic} />
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
    'episode_number': 0,
    'scenes': [
      {
        'scene_number': 0,
        'heading': {
          'standard_location_name': 'GREATNORTHERN',
          'time': 'LOBBY',
          'int_ext': 'INT',
          'standard_location_id': 5,
          'location': 'GREATNORTHERNHOTEL'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'MODEL',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'MIKE',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/3/3e/Maddy_5_%286%29.jpg/revision/latest/scale-to-width-down/270?cb=20150226205004'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'LAZARE',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          }
        ]
      },
      {
        'scene_number': 8,
        'heading': {
          'standard_location_name': 'BOBHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': 'BOBHOUSE'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'BEN',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'JEAN',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/3/3e/Maddy_5_%286%29.jpg/revision/latest/scale-to-width-down/270?cb=20150226205004'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'CARL',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          }
        ]
      }
    ]
  },
  {
    'episode_number': 1,
    'scenes': [
      {
        'scene_number': 0,
        'heading': {
          'standard_location_name': 'BENSKITCHEN',
          'time': 'LOBBY',
          'int_ext': 'INT',
          'standard_location_id': 7,
          'location': 'BENSKITCHEN'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'PAUL',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'MARIA',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'NELL',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/3/3e/Maddy_5_%286%29.jpg/revision/latest/scale-to-width-down/270?cb=20150226205004'
          }
        ]
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'BOBHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': 'BOBHOUSE'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'MODEL',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'MIKE',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'LAZARE',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/7/72/LelandDoppelganger.jpg/revision/latest/scale-to-width-down/275?cb=20100710231737'
          }
        ]
      }
    ]
  },
  {
    'episode_number': 2,
    'scenes': [
      {
        'scene_number': 0,
        'heading': {
          'standard_location_name': 'ALIZASKITCHEN',
          'time': 'LOBBY',
          'int_ext': 'INT',
          'standard_location_id': 12,
          'location': 'ALIZAKITCHEN'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'MODEL',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'MIKE',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'LAZARE',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/7/72/LelandDoppelganger.jpg/revision/latest/scale-to-width-down/275?cb=20100710231737'
          }
        ]
      },
      {
        'scene_number': 2,
        'heading': {
          'standard_location_name': 'BOBHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': 'BOBHOUSE'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'MODEL',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'MIKE',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'LAZARE',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette3.wikia.nocookie.net/twinpeaks/images/7/72/LelandDoppelganger.jpg/revision/latest/scale-to-width-down/275?cb=20100710231737'
          }
        ]
      },
      {
        'scene_number': 14,
        'heading': {
          'standard_location_name': 'BOBHOUSE',
          'time': 'NIGHT',
          'int_ext': 'INT',
          'standard_location_id': 6,
          'location': 'BOBHOUSE'
        },
        'characters': [
          {
            'standard_character_id': '90',
            'standard_character_name': 'MODEL',
            'character_group': '7',
            'raw_character_name': 'MODEL',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '88',
            'standard_character_name': 'MIKE',
            'character_group': '2',
            'raw_character_name': 'MIKE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          },
          {
            'standard_character_id': '74',
            'standard_character_name': 'LAZARE',
            'character_group': '7',
            'raw_character_name': 'LAZARE',
            'character_image': 'http://vignette1.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg/revision/latest?cb=20111126082546'
          }
        ]
      }
    ]
  }
]

var LOCATIONS = [
  {'standard_location_id': 5,
  'standard_location_name': 'GREATNORTHERN'},
  {'standard_location_id': 6,
  'standard_location_name': 'BOBHOUSE'},
  {'standard_location_id': 7,
  'standard_location_name': 'BENSKITCHEN'},
  {'standard_location_id': 12,
  'standard_location_name': 'ALIZASKITCHEN'},
  {'standard_location_id': 13,
  'standard_location_name': 'DETROIT'},
  {'standard_location_id': 14,
  'standard_location_name': 'CAMBRIDGE'}
]

ReactDOM.render(
  <App episodes={EPISODES} locations={LOCATIONS} />,
  document.getElementById('app')
)
