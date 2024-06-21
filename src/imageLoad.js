const imageLoad = (() => {
  const imagesContext = require.context('./icons/', false, /\.(svg)$/);

  const folderContexts = {
    '01-sunny': require.context('./banners/01-sunny', false, /\.(png|jpg|gif|svg)$/),
    '02-mostly-sunny': require.context('./banners/02-mostly-sunny', false, /\.(png|jpg|gif|svg)$/),
    '03-partly-cloudy-day': require.context('./banners/03-partly-cloudy-day', false, /\.(png|jpg|gif|svg)$/),
    '04-mostly-cloudy-day': require.context('./banners/04-mostly-cloudy-day', false, /\.(png|jpg|gif|svg)$/),
    '05-clear': require.context('./banners/05-clear', false, /\.(png|jpg|gif|svg)$/),
    '06-mostly-clear': require.context('./banners/06-mostly-clear', false, /\.(png|jpg|gif|svg)$/),
    '07-partly-cloudy-night': require.context('./banners/07-partly-cloudy-night', false, /\.(png|jpg|gif|svg)$/),
    '08-mostly-cloudy-night': require.context('./banners/08-mostly-cloudy-night', false, /\.(png|jpg|gif|svg)$/),
    '09-cloudy': require.context('./banners/09-cloudy', false, /\.(png|jpg|gif|svg)$/),
    '10-drizzle': require.context('./banners/10-drizzle', false, /\.(png|jpg|gif|svg)$/),
    '11-rain': require.context('./banners/11-rain', false, /\.(png|jpg|gif|svg)$/),
    '12-heavy-rain': require.context('./banners/12-heavy-rain', false, /\.(png|jpg|gif|svg)$/),
    '13-flurries': require.context('./banners/13-flurries', false, /\.(png|jpg|gif|svg)$/),
    '15-snow-showers-snow': require.context('./banners/15-snow-showers-snow', false, /\.(png|jpg|gif|svg)$/),
    '16-blowing-snow': require.context('./banners/16-blowing-snow', false, /\.(png|jpg|gif|svg)$/),
    '17-heavy-snow-blizzard': require.context('./banners/17-heavy-snow-blizzard', false, /\.(png|jpg|gif|svg)$/),
    '19-mixed-rain-hail-rain-sleet': require.context('./banners/19-mixed-rain-hail-rain-sleet', false, /\.(png|jpg|gif|svg)$/),
    '20-rain-snow-wintry-mix': require.context('./banners/20-rain-snow-wintry-mix', false, /\.(png|jpg|gif|svg)$/),
    '22-iso-thunderstorms': require.context('./banners/22-iso-thunderstorms', false, /\.(png|jpg|gif|svg)$/),
    '23-scattered-thunderstorms': require.context('./banners/23-scattered-thunderstorms', false, /\.(png|jpg|gif|svg)$/),
    '24-strong-thunderstorms': require.context('./banners/24-strong-thunderstorms', false, /\.(png|jpg|gif|svg)$/),
    '25-breezy-windy': require.context('./banners/25-breezy-windy', false, /\.(png|jpg|gif|svg)$/),
    '26-haze-fog-dust-smoke': require.context('./banners/26-haze-fog-dust-smoke', false, /\.(png|jpg|gif|svg)$/),
  };

  const getRandomImage = (folderContext) => {
    const keys = folderContext.keys();
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return folderContext(randomKey);
  }

  const renderIcon = (boolean, code) => {
    const iconImage = boolean ? imageMap[code].day.icon : imageMap[code].night.icon;

    return iconImage;
  }

  const imageMap = {
    1000: {
      day: {
        icon: imagesContext('./clear_day.svg'),
        banner_folder: '01-sunny'
      },
      night: {
        icon: imagesContext('./clear_night.svg'),
        banner_folder: '05-clear'
      }
    },

    1003: {
      day: {
        icon: imagesContext('./partly_cloudy_day.svg'),
        banner_folder: '03-partly-cloudy-day'
      },
      night: {
        icon: imagesContext('./partly_cloudy_night.svg'),
        banner_folder: '07-partly-cloudy-night'
      }
    },

    1006: {
      day: {
        icon: imagesContext('./cloudy.svg'),
        banner_folder: '09-cloudy'
      },
      night: {
        icon: imagesContext('./mostly_cloudy_night.svg'),
        banner_folder: '08-mostly-cloudy-night'
      }
    },

    1009: {
      day: {
        icon: imagesContext('./mostly_cloudy_day.svg'),
        banner_folder: '09-cloudy'
      },
      night: {
        icon: imagesContext('./mostly_cloudy_night.svg'),
        banner_folder: '08-mostly-cloudy-night'
      }
    },

    1030: {
      day: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '26-haze-fog-dust-smoke'
      },
      night: {
        icon: imagesContext('./haze_fog_dust_smoke.svg'),
        banner_folder: '26-haze-fog-dust-smoke'
      }
    },

    1063: {
      day: {
        icon: imagesContext('./sunny_with_rain.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./scattered_showers_night.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1066: {
      day: {
        icon: imagesContext('./scattered_snow_showers_day.svg'),
        banner_folder: '15-snow-showers-snow'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '15-snow-showers-snow'
      }
    },

    1069: {
      day: {
        icon: imagesContext('./sleet_hail.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./sleet_hail.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1072: {
      day: {
        icon: imagesContext('./sleet_hail.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./sleet_hail.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1087: {
      day: {
        icon: imagesContext('./isolated_scattered_thunderstorms_day.svg'),
        banner_folder: '22-iso-thunderstorms'
      },
      night: {
        icon: imagesContext('./isolated_scattered_thunderstorms_night.svg'),
        banner_folder: '22-iso-thunderstorms'
      }
    },

    1114: {
      day: {
        icon: imagesContext('./blowing_snow.svg'),
        banner_folder: '16-blowing-snow'
      },
      night: {
        icon: imagesContext('./blowing_snow.svg'),
        banner_folder: '16-blowing-snow'
      }
    },

    1117: {
      day: {
        icon: imagesContext('./blizzard.svg'),
        banner_folder: '17-heavy-snow-blizzard'
      },
      night: {
        icon: imagesContext('./blizzard.svg'),
        banner_folder: '17-heavy-snow-blizzard'
      }
    },

    1135: {
      day: {
        icon: imagesContext('./haze_fog_dust_smoke.svg'),
        banner_folder: '26-haze-fog-dust-smoke'
      },
      night: {
        icon: imagesContext('./haze_fog_dust_smoke.svg'),
        banner_folder: '26-haze-fog-dust-smoke'
      }
    },

    1147: {
      day: {
        icon: imagesContext('./haze_fog_dust_smoke.svg'),
        banner_folder: '26-haze-fog-dust-smoke'
      },
      night: {
        icon: imagesContext('./haze_fog_dust_smoke.svg'),
        banner_folder: '26-haze-fog-dust-smoke'
      }
    },

    1150: {
      day: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1153: {
      day: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1168: {
      day: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1171: {
      day: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1180: {
      day: {
        icon: imagesContext('./scattered_showers_day.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./scattered_showers_night.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1183: {
      day: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      },
      night: {
        icon: imagesContext('./drizzle.svg'),
        banner_folder: '10-drizzle'
      }
    },

    1186: {
      day: {
        icon: imagesContext('./sunny_with_rain.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./sunny_with_rain.svg'),
        banner_folder: '11-rain'
      }
    },

    1189: {
      day: {
        icon: imagesContext('./sunny_with_rain.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./sunny_with_rain.svg'),
        banner_folder: '11-rain'
      }
    },

    1192: {
      day: {
        icon: imagesContext('./heavy_rain.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./heavy_rain.svg'),
        banner_folder: '11-rain'
      }
    },

    1195: {
      day: {
        icon: imagesContext('./heavy_rain.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./heavy_rain.svg'),
        banner_folder: '11-rain'
      }
    },

    1198: {
      day: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1201: {
      day: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1204: {
      day: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1207: {
      day: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1210: {
      day: {
        icon: imagesContext('./scattered_snow_showers_day.svg'),
        banner_folder: '13-flurries'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1213: {
      day: {
        icon: imagesContext('./flurries.svg'),
        banner_folder: '13-flurries'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '13-flurries'
      }
    },

    1216: {
      day: {
        icon: imagesContext('./flurries.svg'),
        banner_folder: '13-flurries'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '13-flurries'
      }
    },

    1219: {
      day: {
        icon: imagesContext('./blowing_snow.svg'),
        banner_folder: '16-blowing-snow'
      },
      night: {
        icon: imagesContext('./blowing_snow.svg'),
        banner_folder: '16-blowing-snow'
      }
    },

    1222: {
      day: {
        icon: imagesContext('./blowing_snow.svg'),
        banner_folder: '16-blowing-snow'
      },
      night: {
        icon: imagesContext('./blowing_snow.svg'),
        banner_folder: '16-blowing-snow'
      }
    },

    1225: {
      day: {
        icon: imagesContext('./heavy_snow.svg'),
        banner_folder: '17-heavy-snow-blizzard'
      },
      night: {
        icon: imagesContext('./heavy_snow.svg'),
        banner_folder: '17-heavy-snow-blizzard'
      }
    },

    1237: {
      day: {
        icon: imagesContext('./heavy_snow.svg'),
        banner_folder: '17-heavy-snow-blizzard'
      },
      night: {
        icon: imagesContext('./heavy_snow.svg'),
        banner_folder: '17-heavy-snow-blizzard'
      }
    },

    1240: {
      day: {
        icon: imagesContext('./scattered_showers_day.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./scattered_showers_night.svg'),
        banner_folder: '11-rain'
      }
    },

    1243: {
      day: {
        icon: imagesContext('./scattered_showers_day.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./scattered_showers_night.svg'),
        banner_folder: '11-rain'
      }
    },

    1246: {
      day: {
        icon: imagesContext('./heavy_rain.svg'),
        banner_folder: '11-rain'
      },
      night: {
        icon: imagesContext('./heavy_rain.svg'),
        banner_folder: '11-rain'
      }
    },

    1249: {
      day: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1252: {
      day: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./mixed_rain_snow.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1255: {
      day: {
        icon: imagesContext('./scattered_snow_showers_day.svg'),
        banner_folder: '15-snow-showers-snow'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '15-snow-showers-snow'
      }
    },

    1258: {
      day: {
        icon: imagesContext('./scattered_snow_showers_day.svg'),
        banner_folder: '15-snow-showers-snow'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '15-snow-showers-snow'
      }
    },

    1261: {
      day: {
        icon: imagesContext('./scattered_snow_showers_day.svg'),
        banner_folder: '15-snow-showers-snow'
      },
      night: {
        icon: imagesContext('./scattered_snow_showers_night.svg'),
        banner_folder: '15-snow-showers-snow'
      }
    },

    1264: {
      day: {
        icon: imagesContext('./sleet_hail.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      },
      night: {
        icon: imagesContext('./sleet_hail.svg'),
        banner_folder: '19-mixed-rain-hail-rain-sleet'
      }
    },

    1273: {
      day: {
        icon: imagesContext('./isolated_scattered_thunderstorms_day.svg'),
        banner_folder: '23-scattered-thunderstorms'
      },
      night: {
        icon: imagesContext('./isolated_scattered_thunderstorms_night.svg'),
        banner_folder: '23-scattered-thunderstorms'
      }
    },

    1276: {
      day: {
        icon: imagesContext('./strong_thunderstorms.svg'),
        banner_folder: '24-strong-thunderstorms'
      },
      night: {
        icon: imagesContext('./strong_thunderstorms.svg'),
        banner_folder: '24-strong-thunderstorms'
      }
    },

    1279: {
      day: {
        icon: imagesContext('./strong_thunderstorms.svg'),
        banner_folder: '24-strong-thunderstorms'
      },
      night: {
        icon: imagesContext('./strong_thunderstorms.svg'),
        banner_folder: '24-strong-thunderstorms'
      }
    },

    1282: {
      day: {
        icon: imagesContext('./strong_thunderstorms.svg'),
        banner_folder: '24-strong-thunderstorms'
      },
      night: {
        icon: imagesContext('./strong_thunderstorms.svg'),
        banner_folder: '24-strong-thunderstorms'
      }
    }
  }

  return {
    imageMap,
    renderIcon,
    folderContexts,
    getRandomImage,
  };

})();

export default imageLoad;
